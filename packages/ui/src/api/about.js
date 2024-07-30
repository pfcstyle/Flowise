import client from './client'

const getVersion = () => client.get(`/version`)

export default {
    getVersion
}
