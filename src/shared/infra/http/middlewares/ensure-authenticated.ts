import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { authConfig } from '@config/auth'
import { InvalidTokenError, TokenMissingError } from '@shared/errors'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new TokenMissingError()
  }

  const [, token] = authHeader.split(' ')

  // console.log('token', token);

  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded as TokenPayload

    req.user = {
      id: sub
    }

    return next()
  } catch (error) {
    throw new InvalidTokenError()
  }
}
