import { injectable, inject } from 'tsyringe'
import { User, UserStatus } from '@entities/user'
import { UserRepository } from '@apps/users/repositories'
import { UserNotFound } from '@apps/users/errors'

export type RegisterConfirmationRequest = {
  email: string
}

@injectable()
export class RegisterConfirmationUseCase {
  constructor(
    @inject('UserRepository')
    private repository: UserRepository
  ) { }

  async execute({ email }: RegisterConfirmationRequest): Promise<User> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new UserNotFound()
    }

    user.confirmed_at = new Date()
    user.status = UserStatus.confirmed

    await this.repository.save(user)

    return user
  }
}
