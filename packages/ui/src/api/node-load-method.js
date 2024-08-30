import client from './client'

const loadByName = (name, body) =>
    client.post(`/node-load-method/${name}`, body, {
        headers: {
            'Content-type': 'application/json',
            'x-request-from': 'internal'
        }
    })

export default {
    loadByName
}
