import { AppError } from '@errors/app-error'
import { container } from 'tsyringe'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'
import { RegisterConfirmationUseCase } from '@apps/users/usecases/register-confirmation/register-confirmation-usecase'

let createUserUseCase: CreateUserUseCase
let registerConfirmationUseCase: RegisterConfirmationUseCase

describe('RegisterConfirmationUseCase', () => {
  beforeEach(() => {
    createUserUseCase = container.resolve(CreateUserUseCase)
    registerConfirmationUseCase = container.resolve(RegisterConfirmationUseCase)
  })

  it('should be able to confirmed user registration', async () => {
    const user = {
      name: `User1`,
      email: `john@mail.com`,
      password: '1234',
      status: 'register'
    }
    await createUserUseCase.execute(user)

    const userConfirmed = await registerConfirmationUseCase.execute({
      email: user.email
    })

    expect(userConfirmed.confirmed_at).not.toBeNull()
  })

  it('should not be able to confirmed user nonexist', async () => {
    await expect(
      registerConfirmationUseCase.execute({
        email: 'nonexist@mail.com'
      })
    ).rejects.toEqual(new AppError('User does not exists'))
  })
})
