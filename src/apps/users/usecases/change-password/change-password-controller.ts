import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ChangePasswordUseCase } from './change-password-use-case'

export class ChangePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body

    const changePasswordUseCase = container.resolve(ChangePasswordUseCase)

    const user = await changePasswordUseCase.execute({
      token,
      password
    })

    return response.status(201).json(user)
  }
}
