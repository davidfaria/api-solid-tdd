import { container } from 'tsyringe'
import { MailProvider, FakeMailProvider } from '@providers/mail'
import {
  UserRepository,
  UserRepositoryInMemory
} from '@apps/users/repositories'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'
import { EmailAlreadyUserd } from '@apps/users/errors'

let createUserUseCase: CreateUserUseCase
let fakeMailProvider: FakeMailProvider

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    container.registerSingleton<UserRepository>(
      'UserRepository',
      UserRepositoryInMemory
    )

    fakeMailProvider = new FakeMailProvider()
    fakeMailProvider.sendMail = jest.fn()

    container.registerInstance<MailProvider>('MailProvider', fakeMailProvider)

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
    expect(fakeMailProvider.sendMail).toHaveBeenCalledTimes(1)
  })

  it('should not able to create duplicate user - Email address already used', async () => {
    const user = {
      name: 'Full Name',
      email: 'john@mail.com',
      password: '123456'
    }
    await createUserUseCase.execute(user)

    await expect(createUserUseCase.execute(user)).rejects.toBeInstanceOf(
      EmailAlreadyUserd
    )
  })
})
