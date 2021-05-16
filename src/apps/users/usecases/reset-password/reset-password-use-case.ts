import { inject, injectable } from 'tsyringe'
import { HashProvider } from '@providers/hash'
import { AppError } from '@errors/app-error'
import { UserRepository } from '@apps/users/repositories'
import { User } from '@entities/user'

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
      throw new AppError('User token does not exists')
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
