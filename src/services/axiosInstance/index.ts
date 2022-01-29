
import axios from 'axios'
import authServiceApi from '../api/auth-service.api'
// import authServiceApi from '../api/auth-service.api'

import {
  requestInterceptor,
  requestInterceptorError,
  responseInterceptor,
  responseInterceptorError,
  serverRequestInterceptor,
  serverResponseInterceptor,
  fileRequestInterceptor,
  fileResponseInterceptor,

} from './interceptor'


const httpClient = axios.create({
  baseURL: '',
})

httpClient.interceptors.request.use(requestInterceptor, requestInterceptorError)

httpClient.interceptors.response.use(responseInterceptor, async (error) => {
  const status = error.response ? error.response.status : null

  if (status === 401) {
    // will loop if refreshToken returns 401
    try {
      const data = await authServiceApi.postRefreshToken()
      console.log(data, 'data', error.config)
      const accessToken = data.data.token
      if (accessToken) {
        error.config.headers['Authorization'] = `${accessToken}`
      }
      console.log(data, 'data', error.config)
      return httpClient.request(error.config)
    } catch (_error) {
      return Promise.reject(_error)
    }
  }

  return Promise.reject(error)
})

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     //extracting response and config objects
//     const { response, config } = error
//     //checking if error is Aunothorized error
//     if (response.status === 401) {
//       // const refreshToken = localStorage.getItem('refreshToken')
//       // if (refreshToken) {
//       //   //if refresh token exists in local storage proceed
//       //   try {
//       //     //try refreshing token
//       //     const data = await customRequest.post('/token/refresh/', {
//       //       refresh: refreshToken,
//       //     })
//       //     const accessToken = data.data.accessToken
//       //     if (accessToken) {
//       //       //if request is successful and token exists in response
//       //       //store it in local storage
//       //       localStorage.setItem('token', accessToken)
//       //       //with new token retry original request
//       //       config.headers['Authorization'] = accessToken
//       //       return customRequest(config)
//       //     }
//       //   } catch (e) {
//       //     console.log(e)
//       //   }
//       // }
//       try {
//         const data = await authServiceApi.postRefreshToken()
//         console.log(data, 'data')
//         const accessToken = data.data.token
//         if (accessToken) {
//           config.headers['Authorization'] = `Bearer ${accessToken}`
//         }
//         return httpClient.request(config)
//       } catch (_error) {
//         return Promise.reject(_error)
//       }
//     }
//     //if none above worked clear local storage and log user out
//     return error
//   })


const httpServer = axios.create({
  baseURL: '',
})

httpServer.interceptors.request.use(serverRequestInterceptor)
httpServer.interceptors.response.use(serverResponseInterceptor)


const httpFormData = axios.create({
  baseURL: '',
})

httpFormData.interceptors.request.use(fileRequestInterceptor)
httpFormData.interceptors.response.use(fileResponseInterceptor)

export {
  httpClient,
  httpServer,
  httpFormData,
}
