import { container } from 'tsyringe'
import { UserRepository, UserRepositoryTypeorm } from '@apps/users/repositories'

container.registerSingleton<UserRepository>(
  'UserRepository',
  UserRepositoryTypeorm
)
