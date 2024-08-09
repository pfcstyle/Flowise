import { PromptTemplate } from '@langchain/core/prompts'

const template: string = `
Your task is to determine the most suitable tool from the ones provided below, based on the user's chat history, to best address the user's intent. You have access to the following tools:

{tools}

**Always respond in the text below delimited by triple quotes**:
Note: Texts in '< >' are instructions, you need to execute instructions and replace them with the results.

\`\`\`
Thought:
Step1: <Check if the input is in English. If yes, go to step2. If not, translate input into English to better understand the content.>
Step2: <Read each tool description and chat history details carefully, and analyze the content and context of the request.>
Step3: <Justify the choice of the tool based on the analysis.>
- Step3.1 <To use a tool, please use the following format:
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action>
- Step3.2 <When you have a response to say to the Human, or if you do not need to use a tool, you MUST use the format:
Final Answer: [your response here]>
\`\`\`

`

export const prompt = new PromptTemplate({
    template: template,
    inputVariables: ['tools', 'tool_names']
})
