import { container } from 'tsyringe'
import {
  UserRepository,
  UserRepositoryInMemory
} from '@apps/users/repositories'

container.registerSingleton<UserRepository>(
  'UserRepository',
  UserRepositoryInMemory
)
