import { AppError } from '@errors/app-error'

export class TokenNotFound extends AppError {
  constructor() {
    super('User token does not exists', 404)
  }
}
