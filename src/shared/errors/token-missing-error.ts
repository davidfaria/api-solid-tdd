import { AppError } from './app-error'

export class TokenMissingError extends AppError {
  constructor() {
    super('Token is missing', 401)
  }
}
