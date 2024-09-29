import fetch from 'node-fetch'
import { Tool } from '@langchain/core/tools'

export interface WorkspaceContextParameters {
    workspaceId?: string
    groupId?: string
    description?: string
    token?: string
}

export class WorkspaceTool extends Tool {
    name = 'workspace_context_tool'
    workspaceId = ''
    token = ''
    groupId = ''
    description =
        'Fetch workspace context includes name, description, Apps, contents, etc. If contents include Feature Services, it will also include the layerFilter. The layerFilter is very important, so you must record it in the output.'

    constructor(args?: WorkspaceContextParameters) {
        super()
        this.workspaceId = args?.workspaceId ?? this.workspaceId
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

    async fetch_item_data(itemId: string) {
        const url = `https://www.arcgis.com/sharing/rest/content/items/${itemId}/data?f=json&token=${this.token}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching item data:', error.message)
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

    async fetch_groups(itemId: string) {
        const url = `https://www.arcgis.com/sharing/rest/content/items/${itemId}/groups?f=json&token=${this.token}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching group items:', error.message)
            return null
        }
    }

    async get_group_items_from_response(data: any) {
        if (!data || data.error) {
            return []
        }
        const contents = Array()
        const results = data['items']
        if (results) {
            for (let result of results) {
                const typeKeywords = result['typeKeywords']
                if (typeKeywords.includes('arcgis-workspaces-item')) {
                    continue
                }
                const type = result['type']
                let layerFilter = ''
                if (type.includes('Feature Service')) {
                    const itemdata = await this.fetch_item_data(result['id'])
                    const errMsg = this.arcgis_response_err(itemdata)
                    if (errMsg) {
                        continue
                    }
                    const layers = itemdata['layers']
                    const layer = layers[0]
                    const layerDefinition = layer['layerDefinition']
                    layerFilter = layerDefinition['definitionExpression']
                }
                contents.push({
                    id: result['id'],
                    title: result['title'] ?? result['name'],
                    thumbnail: result['thumbnail'],
                    description: result['description'] ?? result['snippet'],
                    type: result['type'],
                    url: result['url'],
                    extent: result['extent'],
                    spatialReference: result['spatialReference'],
                    subInfo: result['subInfo'],
                    layerFilter: layerFilter
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
        console.info(`Fetching workspace context for ${this.workspaceId}`)
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
            items.push(...(await this.get_group_items_from_response(groupData)))
        } else {
            const groups = await this.fetch_groups(workspaceId)
            const errMsg = this.arcgis_response_err(groups)
            if (errMsg) {
                return errMsg
            }
            const adminGroups = groups['admin']
            const memberGroups = groups['member']
            for (let group of adminGroups) {
                if (group['isFav']) {
                    continue
                }
                const groupId = group['id']
                const groupData = await this.search_group_items(groupId)
                const groupErrMsg = this.arcgis_response_err(groupData)
                if (groupErrMsg) {
                    continue
                }
                items.push(...(await this.get_group_items_from_response(groupData)))
            }
            for (let group of memberGroups) {
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
            description: data['description'] ?? data['snippet'],
            items: items
        })
    }
}
