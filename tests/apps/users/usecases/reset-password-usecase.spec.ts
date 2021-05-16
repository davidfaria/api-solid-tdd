import { AppError } from '@errors/app-error'
import { container } from 'tsyringe'
import { ForgotPasswordUseCase } from '@apps/users/usecases/forgot-password/forgot-password-usecase'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'
import { ResetPasswordUseCase } from '@apps/users/usecases/reset-password/reset-password-use-case'

let createUserUseCase: CreateUserUseCase
let forgotPasswordUseCase: ForgotPasswordUseCase
let resetPasswordUseCase: ResetPasswordUseCase

describe('ResetPasswordUseCase', () => {
  beforeEach(() => {
    createUserUseCase = container.resolve(CreateUserUseCase)
    forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase)
    resetPasswordUseCase = container.resolve(ResetPasswordUseCase)
  })

  it('should be able to reset password', async () => {
    const user = {
      name: 'Full Name',
      email: 'john@mail.com',
      password: '123456'
    }
    await createUserUseCase.execute(user)
    const userForgot = await forgotPasswordUseCase.execute({
      email: user.email
    })

    const userPasswordResetd = await resetPasswordUseCase.execute({
      token: userForgot?.forgot as string,
      password: '654321'
    })

    expect(userPasswordResetd.password).toEqual('654321')
    expect(userPasswordResetd.forgot).toBeNull()
    expect(userPasswordResetd.forgot_at).toBeNull()
  })

  it('should not be able to reset password from token nonexist', async () => {
    await expect(
      resetPasswordUseCase.execute({
        token: 'token-nonexist',
        password: '654321'
      })
    ).rejects.toEqual(new AppError('User token does not exists'))
  })
})
