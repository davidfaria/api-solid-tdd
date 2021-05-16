import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { RegisterConfirmationUseCase } from './register-confirmation-usecase'

export class RegisterConfirmationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const registerConfirmationUseCase = container.resolve(
      RegisterConfirmationUseCase
    )
    await registerConfirmationUseCase.execute({ email })

    return response.status(204).json()
  }
}
