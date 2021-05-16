import { AppError } from '@errors/app-error'
import { container } from 'tsyringe'
import { ForgotPasswordUseCase } from '@apps/users/usecases/forgot-password/forgot-password-usecase'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'
import { ChangePasswordUseCase } from '@apps/users/usecases/change-password/change-password-use-case'

let createUserUseCase: CreateUserUseCase
let forgotPasswordUseCase: ForgotPasswordUseCase
let changePasswordUseCase: ChangePasswordUseCase

describe('ChangePasswordUseCase', () => {
  beforeEach(() => {
    createUserUseCase = container.resolve(CreateUserUseCase)
    forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase)
    changePasswordUseCase = container.resolve(ChangePasswordUseCase)
  })

  it('should be able to change password', async () => {
    const user = {
      name: 'Full Name',
      email: 'john@mail.com',
      password: '123456'
    }
    await createUserUseCase.execute(user)
    const userForgot = await forgotPasswordUseCase.execute({
      email: user.email
    })

    const userPasswordChanged = await changePasswordUseCase.execute({
      token: userForgot?.forgot as string,
      password: '654321'
    })

    expect(userPasswordChanged.password).toEqual('654321')
    expect(userPasswordChanged.forgot).toBeNull()
    expect(userPasswordChanged.forgot_at).toBeNull()
  })

  it('should not be able to change password from token nonexist', async () => {
    await expect(
      changePasswordUseCase.execute({
        token: 'token-nonexist',
        password: '654321'
      })
    ).rejects.toEqual(new AppError('User token does not exists'))
  })
})
