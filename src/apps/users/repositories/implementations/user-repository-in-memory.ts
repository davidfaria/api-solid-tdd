import { UserRepository, CreateUserDTO } from '@apps/users/repositories'
import { User } from '@entities/user'

export class UserRepositoryInMemory implements UserRepository {
  private users: User[] = []

  async findAll(): Promise<User[]> {
    return this.users
  }
  async findByToken(token: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.forgot === token)

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email)

    return user
  }
  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { name, email, password })

    await this.users.push(user)

    return user
  }
  async save(user: User): Promise<User> {
    return user
  }
}
