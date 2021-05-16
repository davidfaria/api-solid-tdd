import {
  UserRepository,
  UserRepositoryInMemory
} from '@apps/users/repositories'
import { container } from 'tsyringe'
import { AuthenticateUseCase } from '@apps/users/usecases/authenticate/authenticate-usecase'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'
import { AppError } from '@errors/app-error'

let createUserUseCase: CreateUserUseCase
let authenticateUseCase: AuthenticateUseCase

describe('AuthenticateUseCase', () => {
  beforeEach(() => {
    container.registerSingleton<UserRepository>(
      'UserRepository',
      UserRepositoryInMemory
    )
    createUserUseCase = container.resolve(CreateUserUseCase)
    authenticateUseCase = container.resolve(AuthenticateUseCase)
  })

  it('should able to authenticate a user ', async () => {
    const user = {
      name: 'UserName',
      email: 'jonh@mail.com',
      password: '123456'
    }

    await createUserUseCase.execute(user)

    const auth = await authenticateUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(auth).toHaveProperty('token')
  })

  it('should not able to authenticate a user with email nonexists', async () => {
    const user = {
      name: 'UserName',
      email: 'jonh@mail.com',
      password: '123456'
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUseCase.execute({
        email: 'nonexists@mail.com',
        password: user.password
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })

  it('should not able to authenticate a user with password invalid', async () => {
    const user = {
      name: 'UserName',
      email: 'jonh@mail.com',
      password: '123456'
    }
    await createUserUseCase.execute(user)

    await expect(
      authenticateUseCase.execute({
        email: user.email,
        password: 'incorrect-password'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })
})
