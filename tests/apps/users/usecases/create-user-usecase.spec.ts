import { container } from 'tsyringe'
import { MailProvider, FakeMailProvider } from '@providers/mail'
import {
  UserRepository,
  UserRepositoryInMemory
} from '@apps/users/repositories'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'

import { AppError } from '@errors/app-error'

let createUserUseCase: CreateUserUseCase

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    container.registerSingleton<UserRepository>(
      'UserRepository',
      UserRepositoryInMemory
    )

    container.registerSingleton<MailProvider>('MailProvider', FakeMailProvider)

    createUserUseCase = container.resolve(CreateUserUseCase)
  })

  it('should be able to create a new user', async () => {
    const user = {
      name: 'Full Name',
      email: 'john@mail.com',
      password: '123456'
    }
    const userCreated = await createUserUseCase.execute(user)

    expect(userCreated).toHaveProperty('id')
    // expect(fakeMailProvider.sendMail).toHaveBeenCalledTimes(1)
  })

  it('should not able to create duplicate user - Email address already used', async () => {
    const user = {
      name: 'Full Name',
      email: 'john@mail.com',
      password: '123456'
    }
    await createUserUseCase.execute(user)

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError('Email address already used')
    )
  })
})
