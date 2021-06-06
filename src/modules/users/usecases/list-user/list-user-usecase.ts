import { injectable, inject } from 'tsyringe'
import { UserRepository } from '@modules/users/repositories'
import { User } from '@entities/user'

@injectable()
export class ListUserUseCase {
  constructor(
    @inject('UserRepository')
    private repository: UserRepository
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.repository.findAll()

    return users
  }
}
