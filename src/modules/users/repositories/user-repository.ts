import { User, UserStatus } from '@entities/user'

export type CreateUserDTO = {
  name: string
  email: string
  password: string
  status: UserStatus
}

export interface UserRepository {
  findAll(): Promise<User[]>
  findByToken(token: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: CreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
