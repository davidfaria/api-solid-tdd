import { container } from 'tsyringe'
import {
  UserRepository,
  UserRepositoryInMemory
} from '@modules/users/repositories'

container.registerSingleton<UserRepository>(
  'UserRepository',
  UserRepositoryInMemory
)
