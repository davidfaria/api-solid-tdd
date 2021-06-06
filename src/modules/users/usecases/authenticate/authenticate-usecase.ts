import { injectable, inject } from 'tsyringe'
import { UserRepository } from '@modules/users/repositories'
import { HashProvider } from '@shared/container/providers/hash/hash-provider'
import { TokenProvider } from '@shared/container/providers/token/token-provider'
import { InvalidCredentials } from '@modules/users/errors'
import { authConfig } from '@config/auth'

export type AuthenticateRequest = {
  email: string
  password: string
}

export type AuthenticateResponse = {
  user: {
    id: string
    name: string
    email: string
    image: string
  }
  token: string
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UserRepository')
    private repository: UserRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
    @inject('TokenProvider')
    private tokenProvider: TokenProvider
  ) { }

  async execute({
    email,
    password
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentials()
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatch) {
      throw new InvalidCredentials()
    }

    const token = this.tokenProvider.generateToken(authConfig.jwt.secret)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      },
      token
    }
  }
}
