import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ForgotPasswordUseCase } from './forgot-password-usecase'

export class ForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase)
    await forgotPasswordUseCase.execute({ email })

    return response.status(204).json()
  }
}
