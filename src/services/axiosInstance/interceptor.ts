import { kebabCaseKeys } from '@/utils/convertKeysCase'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
// import authServiceApi from '../api/auth-service.api'
import Router  from 'next/router'


let tokenType = ''
let accessToken = ''

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // check expired time, if about to expired get new access token
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
//   const typeToken = 'Bearer'
  config.headers = {
    ...config.headers,
    ...((accessToken !== null && accessToken !== undefined) && { Authorization: `${tokenType} ${accessToken}` }),
  }
  if (config.params) {
    config.params = kebabCaseKeys(config.params)
  }
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true })
  }
  return config
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const requestInterceptorError = (error: any): Promise<any> => {
  // console.log('requestInterceptorError')
  // handle error code
  return Promise.reject(error)
}

const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  // change body key format
  response.data = camelcaseKeys(response.data, { deep: true })
  const { url } = response.config
  if (
    url.includes('/refresh-token')
  ) {
    const bytesV  = response.data.v
    const bytesK  = response.data.k

    tokenType = bytesK
    accessToken = bytesV
  }

  if (
    url.includes('/logout')
  ) {
    console.log('logout', 'logout')
    tokenType = ''
    accessToken = ''
  }
  return response.data
}

// const responseInterceptorError = async(error: any): Promise<any> => {
//   // handle error code 401, 404, 500
//   const { response } = error
//   const originalRequest = error.config
//   if (response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true
//     await RefreshHook()
//     // Router.reload()
//     // RefreshHook()
//     console.log(response)
//     return
//   }
//   return Promise.reject(error)
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const responseInterceptorError = async(error: any): Promise<any> => {
  // handle error code 401, 404, 500
  const { response } = error
  const originalRequest = error.config
  if (response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    console.log(response)
    return
  }
  return Promise.reject(error)
}

const serverRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.log('server accesstoken', 'err before')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const typeToken = 'Bearer'
  config.headers = {
    ...config.headers,
    ...(token !== '' && { Authorization: `${typeToken} ${token}` }),
    'Content-Type': 'application/json',
  }
  console.log('header', config.headers)
  if (config.params) {
    config.params = kebabCaseKeys(config.params)
  }
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true })
  }
  return config
}

const serverResponseInterceptor = (response: AxiosResponse): AxiosResponse => {
  response.data = camelcaseKeys(response.data, { deep: true })
  return response.data
}

const fileRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const typeToken = 'Bearer'
  config.headers = {
    ...config.headers,
    ...((token !== null && token !== undefined) && { Authorization: `${typeToken} ${token}` }),
    'Content-Type': 'multipart/form-data',
  }
  if (config.params) {
    config.params = kebabCaseKeys(config.params)
  }
  return config
}

const fileResponseInterceptor = (response: AxiosResponse): AxiosResponse => {
  response.data = camelcaseKeys(response.data, { deep: true })
  return response.data
}

export {
  requestInterceptor,
  requestInterceptorError,
  responseInterceptor,
  responseInterceptorError,
  serverRequestInterceptor,
  serverResponseInterceptor,
  fileRequestInterceptor,
  fileResponseInterceptor,
}
