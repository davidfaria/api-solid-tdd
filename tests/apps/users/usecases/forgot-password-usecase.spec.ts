import { container } from 'tsyringe'
import { FakeMailProvider, MailProvider } from '@providers/mail'
import {
  UserRepositoryInMemory,
  UserRepository
} from '@apps/users/repositories'
import { ForgotPasswordUseCase } from '@apps/users/usecases/forgot-password/forgot-password-usecase'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'
import { UserNotFound } from '@apps/users/errors'

let createUserUseCase: CreateUserUseCase
let forgotPasswordUseCase: ForgotPasswordUseCase
let fakeMailProvider: FakeMailProvider

describe('FogotPasswordUseCase', () => {
  beforeEach(() => {
    container.registerSingleton<UserRepository>(
      'UserRepository',
      UserRepositoryInMemory
    )

    fakeMailProvider = new FakeMailProvider()
    fakeMailProvider.sendMail = jest.fn()

    container.registerInstance<MailProvider>('MailProvider', fakeMailProvider)

    createUserUseCase = container.resolve(CreateUserUseCase)
    forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase)
  })

  it('should able to send mail to forgot password', async () => {
    const user = {
      name: `User1`,
      email: `john@mail.com`,
      password: '1234'
    }
    await createUserUseCase.execute(user)

    const userForgot = await forgotPasswordUseCase.execute({
      email: user.email
    })

    expect(userForgot.forgot).not.toBeNull()
    expect(userForgot.forgot_at).not.toBeNull()
    expect(fakeMailProvider.sendMail).toBeCalledTimes(2)
  })

  it('should not able to forgot password to email nonexists', async () => {
    const user = {
      name: `User1`,
      email: `john@mail.com`,
      password: '1234'
    }
    await createUserUseCase.execute(user)

    await expect(
      forgotPasswordUseCase.execute({
        email: 'email-not-exists@mail.com'
      })
    ).rejects.toBeInstanceOf(UserNotFound)
  })
})
