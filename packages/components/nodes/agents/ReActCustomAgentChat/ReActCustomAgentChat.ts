import { ChainValues } from '@langchain/core/utils/types'
import { BaseMessage } from '@langchain/core/messages'
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables'
import { flatten } from 'lodash'
import { AgentStep } from 'langchain/agents'
import { Tool } from '@langchain/core/tools'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatPromptTemplate, MessagesPlaceholder, HumanMessagePromptTemplate, PromptTemplate } from '@langchain/core/prompts'
import { additionalCallbacks, CustomChainHandler } from '../../../src/handler'
import { IVisionChatModal, FlowiseMemory, ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { ReActSingleInputOutputParser, renderTextDescription, AgentExecutor } from '../../../src/agents'
import { addImagesToMessages, llmSupportsVision } from '../../../src/multiModalUtils'
import { checkInputs, Moderation, streamResponse } from '../../moderation/Moderation'
import { formatResponse } from '../../outputparsers/OutputParserHelpers'
import { prompt as systmePrompt } from './prompt-template'
import { formatLogToString } from 'langchain/agents/format_scratchpad/log'

class ReActCustomAgentChat_Agents implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]
    sessionId?: string
    template: string = ``

    constructor(fields?: { sessionId?: string }) {
        this.label = 'ReAct Custom Agent for Chat Models'
        this.name = 'chainOfThoughtAgentChat'
        this.version = 4.0
        this.type = 'AgentExecutor'
        this.category = 'Agents'
        this.icon = 'agent.svg'
        this.description =
            'Agent that uses the Chain of Thought logic to decide what action to take, optimized to be used with Chat Models. Prompt is a array of messages'
        this.baseClasses = [this.type, ...getBaseClasses(AgentExecutor)]
        this.inputs = [
            {
                label: 'Allowed Tools',
                name: 'tools',
                type: 'Tool',
                list: true
            },
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'Memory',
                name: 'memory',
                type: 'BaseChatMemory'
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            },
            {
                label: 'Max Iterations',
                name: 'maxIterations',
                type: 'number',
                optional: true,
                additionalParams: true
            }
        ]
        this.sessionId = fields?.sessionId
    }

    async init(): Promise<any> {
        return null
    }

    async run(nodeData: INodeData, input: string, options: ICommonObject): Promise<string | object> {
        const memory = nodeData.inputs?.memory as FlowiseMemory
        const memoryKey = memory.memoryKey ? memory.memoryKey : 'chat_history'
        const inputKey = memory.inputKey ? memory.inputKey : 'input'
        const maxIterations = nodeData.inputs?.maxIterations as string
        const model = nodeData.inputs?.model as BaseChatModel
        let tools = nodeData.inputs?.tools as Tool[]
        const moderations = nodeData.inputs?.inputModeration as Moderation[]
        const prependMessages = options?.prependMessages
        const isStreamable = options.socketIO && options.socketIOClientId
        options.logger.info(`socketIO: ${options.socketIO}, socketIOClientId: ${options.socketIOClientId}`)

        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the ReAct Agent for Chat Models
                input = await checkInputs(moderations, input)
            } catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500))
                if (isStreamable)
                    streamResponse(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId)
                //streamResponse(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId)
                return formatResponse(e.message)
            }
        }
        tools = flatten(tools)

        const toolNames = tools.map((tool) => tool.name)
        const systemMessage = await systmePrompt.format({
            tools: renderTextDescription(tools),
            tool_names: toolNames.join(', ')
        })
        const chatPromptTemplate = ChatPromptTemplate.fromMessages([
            ['system', systemMessage],
            new MessagesPlaceholder(memoryKey),
            ['human', `{${inputKey}}`],
            new MessagesPlaceholder('agent_scratchpad')
        ])

        if (llmSupportsVision(model)) {
            const visionChatModel = model as IVisionChatModal
            const messageContent = await addImagesToMessages(nodeData, options, model.multiModalOption)

            if (messageContent?.length) {
                visionChatModel.setVisionModel()

                // Pop the `agent_scratchpad` MessagePlaceHolder
                let messagePlaceholder = chatPromptTemplate.promptMessages.pop() as MessagesPlaceholder
                if (chatPromptTemplate.promptMessages.at(-1) instanceof HumanMessagePromptTemplate) {
                    const lastMessage = chatPromptTemplate.promptMessages.pop() as HumanMessagePromptTemplate
                    const template = (lastMessage.prompt as PromptTemplate).template as string
                    const msg = HumanMessagePromptTemplate.fromTemplate([
                        ...messageContent,
                        {
                            text: template
                        }
                    ])
                    msg.inputVariables = lastMessage.inputVariables
                    chatPromptTemplate.promptMessages.push(msg)
                }

                // Add the `agent_scratchpad` MessagePlaceHolder back
                chatPromptTemplate.promptMessages.push(messagePlaceholder)
            } else {
                visionChatModel.revertToOriginalModel()
            }
        }
        const llmWithStop = model.bind({
            stop: ['\nObservation:']
        })
        const runnable = RunnableSequence.from([
            RunnablePassthrough.assign({
                agent_scratchpad: (input: { steps: AgentStep[] }) => [formatLogToString(input.steps)],
                [memoryKey]: async (_: { steps: AgentStep[] }) => {
                    const messages = (await memory.getChatMessages(this.sessionId, true, prependMessages)) as BaseMessage[]
                    return messages ?? []
                }
            }),
            chatPromptTemplate,
            llmWithStop,
            new ReActSingleInputOutputParser({
                toolNames
            })
        ])
        const executor = AgentExecutor.fromAgentAndTools({
            agent: runnable,
            tools,
            verbose: process.env.DEBUG === 'true' ? true : false,
            maxIterations: maxIterations ? parseFloat(maxIterations) : undefined
        })

        const callbacks = await additionalCallbacks(nodeData, options)
        let result: ChainValues = {}
        if (isStreamable) {
            options.logger.info('Using CustomChainHandler for streamable agent')
            const handler = new CustomChainHandler(options.socketIO, options.socketIOClientId)
            result = await executor.invoke({ input }, { callbacks: [handler, ...callbacks] })
        } else {
            result = await executor.invoke({ [inputKey]: input }, { callbacks })
        }

        await memory.addChatMessages(
            [
                {
                    text: input,
                    type: 'userMessage'
                },
                {
                    text: result?.output,
                    type: 'apiMessage'
                }
            ],
            this.sessionId
        )

        return result?.output
    }
}

module.exports = { nodeClass: ReActCustomAgentChat_Agents }
