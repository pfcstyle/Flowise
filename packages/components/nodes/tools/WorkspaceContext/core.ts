import fetch from 'node-fetch'
import { Tool } from '@langchain/core/tools'

export interface WorkspaceContextParameters {
    workspaceId?: string
    groupId?: string
    description?: string
    token?: string
}

export class WorkspaceTool extends Tool {
    name = 'workspace_tool'
    workspaceId = ''
    token = ''
    groupId = ''
    description = 'Fetch workspace context includes name, description, Apps, contents, etc.'

    constructor(args?: WorkspaceContextParameters) {
        super()
        this.workspaceId = args?.workspaceId ?? this.workspaceId
        this.description = args?.description ?? this.description
        this.groupId = args?.groupId ?? this.groupId
        this.token = args?.token ?? this.token
    }

    async fetch_item(itemId: string) {
        const url = `https://www.arcgis.com/sharing/rest/content/items/${itemId}?f=json&token=${this.token}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching item:', error.message)
            return null
        }
    }

    async search_group_items(groupId: string) {
        const url = `https://www.arcgis.com/sharing/rest/content/groups/${groupId}?f=json&token=${this.token}&num=1000`
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching group items:', error.message)
            return null
        }
    }

    get_group_items_from_response(data: any) {
        if (!data || data.error) {
            return []
        }
        const contents = Array()
        const results = data['results']
        if (results) {
            for (let result of results) {
                const typeKeywords = result['typeKeywords']
                if (typeKeywords.contains['arcgis-workspaces-item']) {
                    continue
                }
                contents.push({
                    id: result['id'],
                    title: result['title'] ?? result['name'],
                    thumbnail: result['thumbnail'],
                    description: result['description'],
                    type: result['type'],
                    url: result['url'],
                    extent: result['extent'],
                    spatialReference: result['spatialReference'],
                    subInfo: result['subInfo']
                })
            }
        }
        return contents
    }

    arcgis_response_err(data: any) {
        if (!data || data.error) {
            let errMsg = 'Error fetching item'
            if (data && data.error) {
                errMsg += `: ${data.error.message}`
            }
            return errMsg
        }
        return null
    }

    /** @ignore */
    async _call(input: string) {
        const workspaceId = !this.workspaceId ? input : this.workspaceId
        if (process.env.DEBUG === 'true') console.info(`Fetching workspace context for ${this.workspaceId}`)
        const data = await this.fetch_item(workspaceId)
        const errMsg = this.arcgis_response_err(data)
        if (errMsg) {
            return errMsg
        }
        const items = Array()
        if (this.groupId) {
            const groupData = await this.search_group_items(this.groupId)
            const groupErrMsg = this.arcgis_response_err(groupData)
            if (groupErrMsg) {
                return groupErrMsg
            }
            items.push(this.get_group_items_from_response(groupData))
        } else {
            const properties = data['properties']
            let groups = []
            if (properties) {
                const workspaceRootNode = properties['workspaceRootNode']
                if (workspaceRootNode) {
                    groups = workspaceRootNode['groups']
                }
            }

            for (let group of groups) {
                const groupId = group['id']
                const groupData = await this.search_group_items(groupId)
                const groupErrMsg = this.arcgis_response_err(groupData)
                if (groupErrMsg) {
                    continue
                }
                items.push(this.get_group_items_from_response(groupData))
            }
        }
        return JSON.stringify({
            name: data['title'] ?? data['name'],
            description: data['description'] ?? this.description,
            items: items
        })
    }
}
