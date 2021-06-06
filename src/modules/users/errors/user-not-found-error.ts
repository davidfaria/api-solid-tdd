import { AppError } from '@errors/app-error'

export class UserNotFound extends AppError {
  constructor() {
    super('User does not exists', 404)
  }
}
