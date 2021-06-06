import { container } from 'tsyringe'
import { UserRepository, UserRepositoryTypeorm } from '@modules/users/repositories'

container.registerSingleton<UserRepository>(
  'UserRepository',
  UserRepositoryTypeorm
)
