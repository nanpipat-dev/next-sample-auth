import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import authServiceApi from '@/services/api/auth-service.api'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method, body, cookies } = req
  console.log(req, 'log for logout')
  switch (method) {
    case 'POST': {
      try {
        console.log(cookies, 'cookies')
        res.setHeader('Set-Cookie', cookie.serialize('refresh_token', 'deleted', {
          maxAge: -1,
        }))
        res.writeHead(200)
        res.end()
        console.log(cookies, 'cookies')
      } catch (error) {
        console.log(error)
        res.status(401).send({ status: 401, message: ['Unauthorize'] })
      }
      break
    }
    default: {
      res.setHeader('Allow', 'POST')
      res.status(405).end(`Method ${method} is not allowed.`)
    }
  }
}
