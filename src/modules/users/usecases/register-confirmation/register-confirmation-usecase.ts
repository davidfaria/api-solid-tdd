import { injectable, inject } from 'tsyringe'
import { User, UserStatus } from '@modules/users/entities/user'
import { UserRepository } from '@modules/users/repositories'
import { UserNotFound } from '@modules/users/errors'

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
