import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import authServiceApi from '@/services/api/auth-service.api'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method, cookies } = req
  // console.log('req verify', req.headers)
  switch (method) {
    case 'POST': {
      try {
        if (!cookies.refresh_token) throw new Error('Unauthorizedwwwww')
        console.log(cookies.refresh_token, 'refresh_token')
        const response = await authServiceApi.serverPostRefreshToken({
          refreshToken: cookies.refresh_token,
        })
        const {
          accessToken,
          expiredIn,
          refreshToken,
          tokenType,
        } = response.data
        res.setHeader('Set-Cookie', cookie.serialize('refresh_token', refreshToken, {
          httpOnly: true,
          sameSite: true,
          secure: true,
          maxAge: 3600,
        }))

        res.status(200).send({ status: 200, v: accessToken, k: 'Bearer' })
      } catch (error) {
        res.status(200).send({ status: 401, message: 'NOT_AUTHORIZED' + cookies.refresh_token })
      }
      break
    }
    default: {
      res.setHeader('Allow', 'POST')
      res.status(405).end(`Method ${method} is not allowed.`)
    }
  }
}
