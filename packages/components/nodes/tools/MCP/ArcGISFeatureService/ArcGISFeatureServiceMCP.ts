import { Tool } from '@langchain/core/tools'
import { INode, INodeData, INodeOptionsValue, INodeParams } from '../../../../src/Interface'
import { MCPToolkit } from '../core'

class ArcGISFeatureService_MCP implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    documentation: string
    credential: INodeParams | undefined
    inputs: INodeParams[]

    constructor() {
        this.label = 'ArcGIS Feature Service MCP'
        this.name = 'arcgisFeatureServiceMCP'
        this.version = 1.0
        this.type = 'ArcGIS Feature Service MCP Tool'
        this.icon = 'arcGISFeatureServiceMCP.svg'
        this.category = 'Tools (MCP)'
        this.description = 'MCP Server for ArcGIS Feature Services'
        this.documentation = 'https://github.com/modelcontextprotocol/servers'
        this.inputs = [
            {
                label: 'Available Actions',
                name: 'mcpActions',
                type: 'asyncMultiOptions',
                loadMethod: 'listActions',
                refresh: true
            }
        ]
        this.baseClasses = ['Tool']
    }

    //@ts-ignore
    loadMethods = {
        listActions: async (nodeData: INodeData): Promise<INodeOptionsValue[]> => {
            try {
                const toolset = await this.getTools(nodeData)
                toolset.sort((a: any, b: any) => a.name.localeCompare(b.name))

                return toolset.map(({ name, ...rest }) => ({
                    label: name.toUpperCase(),
                    name: name,
                    description: rest.description || name
                }))
            } catch (error) {
                return [
                    {
                        label: 'No Available Actions',
                        name: 'error',
                        description: 'No available actions, please check your MCP server URL and refresh'
                    }
                ]
            }
        }
    }

    async init(nodeData: INodeData): Promise<any> {
        const tools = await this.getTools(nodeData)

        const _mcpActions = nodeData.inputs?.mcpActions
        let mcpActions = []
        if (_mcpActions) {
            try {
                mcpActions = typeof _mcpActions === 'string' ? JSON.parse(_mcpActions) : _mcpActions
            } catch (error) {
                console.error('Error parsing mcp actions:', error)
            }
        }
        return tools.filter((tool: any) => mcpActions.includes(tool.name))
    }

    async getTools(nodeData: INodeData): Promise<Tool[]> {
        let serverParams = {
            // url: 'https://server.smithery.ai/@puran1218/arcgis-location-services-mcp/mcp?api_key=1b58cf58-76e7-49d8-bdf1-f916b6ef6b57&profile=clumsy-lizard-56AwZy'
            url: 'http://127.0.0.1:9002/mcp'
        }
        const toolkit = new MCPToolkit(serverParams, 'sse', nodeData.inputs)
        await toolkit.initialize()
        const tools = toolkit.tools ?? []
        return tools as Tool[]
    }
}

module.exports = { nodeClass: ArcGISFeatureService_MCP }
