import { inject, injectable } from 'tsyringe'
import { HashProvider } from '@shared/container/providers/hash/hash-provider'
import { UserRepository } from '@modules/users/repositories'
import { User } from '@modules/users/entities/user'
import { TokenNotFound } from '@modules/users/errors'

type ResetPasswordUseCaseRequest = {
  token: string
  password: string
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider
  ) { }

  async execute({
    token,
    password
  }: ResetPasswordUseCaseRequest): Promise<User> {
    const user = await this.userRepository.findByToken(token)

    if (!user) {
      // throw new AppError('User token does not exists')
      throw new TokenNotFound()
    }

    // const tokenCreatedAt = userToken.created_at
    // const compareDate = addHours(tokenCreatedAt, 2)
    // if (isAfter(Date.now(), compareDate)) {
    //   throw new AppError('Token exired')
    // }

    user.password = await this.hashProvider.generateHash(password)
    user.forgot = null
    user.forgot_at = null

    await this.userRepository.save(user)

    return user
  }
}
