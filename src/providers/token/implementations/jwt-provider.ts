import { injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { TokenProvider } from '@providers/token'

import { authConfig } from '@config/auth'

@injectable()
export class JWTProvider implements TokenProvider {
  generateToken(subject: string): string {
    return sign({}, authConfig.jwt.secret, {
      subject,
      expiresIn: authConfig.jwt.expiresIn
    })
  }
}
