import axios from 'axios'
import { baseURL } from '@/store/constant'
import { signIn, findCredential } from '@/utils/arcgisAuthentication'

const apiClient = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
        'Content-type': 'application/json',
        'x-request-from': 'internal'
    }
})

apiClient.interceptors.request.use(async function (config) {
    let credential = findCredential()
    if (credential) {
        config.headers.Authorization = `Bearer ${credential.token}`
    } else {
        credential = await signIn()
        if (credential) {
            config.headers.Authorization = `Bearer ${credential.token}`
        }
    }
    return config
})

export default apiClient
