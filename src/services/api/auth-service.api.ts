import { AuthRefreshToken, AuthSignInPassword, AuthSignUpPassword } from '@/models/auth-service.model'
import { AxiosPromise } from 'axios'
import { httpClient, httpServer } from '../axiosInstance'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const API_URL = 'https://go-hex-auth.herokuapp.com'

const postLoginWithUsernameAndPassword = (authPasswordData: AuthSignInPassword): AxiosPromise<any> => httpClient({
  method: 'post',
  url: `${BASE_URL}/api/login`,
  data: authPasswordData,
})

const postSignUpWithPassword = (authSignUpPasswordData: AuthSignUpPassword): AxiosPromise<any> => httpClient({
  method: 'post',
  url: `${BASE_URL}/api/signup`,
  data: {
    ...authSignUpPasswordData,
  },
})

const getProfile = (): AxiosPromise<any> => httpClient({
  method:'get',
  url:`${API_URL}/api/v1/validate`
})

const postLogout =():AxiosPromise<any> => httpClient({
  method:'post',
  url: `${BASE_URL}/api/logout`,
})

const postRefreshToken = (): AxiosPromise<any> => httpClient({
  method: 'post',
  url: `${BASE_URL}/api/refresh-token`,
})

const serverPostLoginWithUsernameAndPassword = (authPassword: AuthSignInPassword): AxiosPromise<any> => httpServer({
  method: 'post',
  url: `${API_URL}/api/v1/login`,
  data: {
    ...authPassword,
  },
})

const serverPostSignUpWithPassword = (authSignUpPasswordData: AuthSignUpPassword): AxiosPromise<any> => httpServer({
  method: 'post',
  url: `${API_URL}/api/v1/create`,
  data: {
    ...authSignUpPasswordData,
  },
})

const serverPostRefreshToken = (refreshToken: AuthRefreshToken): AxiosPromise<any> => httpServer({
  method: 'post',
  url: `${API_URL}/api/v1/refresh`,
  data: {
    ...refreshToken,
  },
})

export default {
  postLoginWithUsernameAndPassword,
  postSignUpWithPassword,
  getProfile,
  postLogout,
  postRefreshToken,
  serverPostLoginWithUsernameAndPassword,
  serverPostSignUpWithPassword,
  serverPostRefreshToken,
}