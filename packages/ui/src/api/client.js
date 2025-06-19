import axios from 'axios'
import { signIn, findCredential } from '@/utils/arcgisAuthentication'
import { baseURL, ErrorMessage } from '@/store/constant'
import AuthUtils from '@/utils/authUtils'

const apiClient = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
        'Content-type': 'application/json',
        'x-request-from': 'internal'
    },
    withCredentials: true
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

// apiClient.interceptors.response.use(
//     function (response) {
//         return response
//     },
//     async (error) => {
//         if (error.response.status === 401) {
//             // check if refresh is needed
//             if (error.response.data.message === ErrorMessage.TOKEN_EXPIRED && error.response.data.retry === true) {
//                 const originalRequest = error.config
//                 // call api to get new token
//                 const response = await axios.post(`${baseURL}/api/v1/auth/refreshToken`, {}, { withCredentials: true })
//                 if (response.data.id) {
//                     // retry the original request
//                     return apiClient.request(originalRequest)
//                 }
//             }
//             localStorage.removeItem('username')
//             localStorage.removeItem('password')
//             AuthUtils.removeCurrentUser()
//         }

//         return Promise.reject(error)
//     }
// )

export default apiClient
