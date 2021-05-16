import { getRepository, Repository } from 'typeorm'
import { CreateUserDTO, UserRepository } from '@apps/users/repositories'
import { User } from '@entities/user'

export class UserRepositoryTypeorm implements UserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async findByToken(token: string): Promise<User | undefined> {
    return await this.repository.findOne({ forgot: token })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({ email })
  }

  async create({
    name,
    email,
    password,
    status
  }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      status
    })

    return await this.save(user)
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user)
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find()
  }
}
