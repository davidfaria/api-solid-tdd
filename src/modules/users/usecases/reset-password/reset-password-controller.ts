import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ResetPasswordUseCase } from './reset-password-usecase'

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

    const user = await resetPasswordUseCase.execute({
      token,
      password
    })

    return response.status(201).json(user)
  }
}
