import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CreateUserUseCase } from './create-user-usecase'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const creteUserUseCase = container.resolve(CreateUserUseCase)

    const user = await creteUserUseCase.execute({ name, email, password })

    return response.status(201).json(user)
  }
}
