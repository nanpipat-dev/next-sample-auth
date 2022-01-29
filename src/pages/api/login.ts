import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import authServiceApi from '@/services/api/auth-service.api'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method, body } = req
  console.log(req, 'log for login')
  switch (method) {
    case 'POST': {
      try {
        const response = await authServiceApi.serverPostLoginWithUsernameAndPassword({
          username: body.username,
          password: body.password,
        })
        const {
          refreshToken,
          accessToken,
        } = response.data
        console.log('CONSOLE', refreshToken, 'LOGGGGG')
        res.setHeader('Set-Cookie', cookie.serialize('refresh_token', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: true,
          maxAge: 3600,
        }))
        res.status(200).send({ status: 200, message: ['OK'], token: accessToken, refresh: refreshToken })
      } catch (error) {
        const errhandle = error?.response?.data?.status?.message[0] || 'error'
        res.status(400).send(errhandle)
      }
      break
    }
    default: {
      res.setHeader('Allow', 'POST')
      res.status(405).end(`Method ${method} is not allowed.`)
    }
  }
}
