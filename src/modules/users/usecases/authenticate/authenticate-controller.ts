import { container } from 'tsyringe'
import { AuthenticateUseCase } from './authenticate-usecase'
import { Request, Response } from 'express'

export class AuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authenticateUseCase = container.resolve(AuthenticateUseCase)
    const user = await authenticateUseCase.execute({
      email,
      password
    })

    return response.json(user)
  }
}
