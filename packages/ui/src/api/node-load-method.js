import client from './client'

const loadByName = (name, body) => client.post(`/node-load-method/${name}`, body)

export default {
    loadByName
}
