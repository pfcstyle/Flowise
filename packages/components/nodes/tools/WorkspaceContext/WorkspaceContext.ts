import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { WorkspaceTool } from './core'

class RequestsGet_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'Workspace Context'
        this.name = 'workspaceContext'
        this.version = 1.0
        this.type = 'WorkspaceContext'
        this.icon = 'workspacecontext.svg'
        this.category = 'Tools'
        this.description = 'Fetch workspace context includes name, description, banners, Apps, contents, groups, etc.'
        this.baseClasses = [this.type, ...getBaseClasses(WorkspaceTool)]
        this.inputs = [
            {
                label: 'Workspace ID',
                name: 'workspaceId',
                type: 'string',
                description:
                    'Agent will fetch workspace context by this workspace ID. If not specified, agent will try to figure out itself from AIPlugin if provided',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Group ID',
                name: 'groupId',
                type: 'string',
                description:
                    'Agent will fetch group contents by this group ID. If not specified, agent will try to figure out itself from AIPlugin if provided',
                additionalParams: true,
                optional: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const workspaceId = nodeData.inputs?.workspaceId as string

        return new WorkspaceTool({
            workspaceId: workspaceId,
            token: options.token,
            groupId: nodeData.inputs?.groupId as string
        })
    }
}

module.exports = { nodeClass: RequestsGet_Tools }
