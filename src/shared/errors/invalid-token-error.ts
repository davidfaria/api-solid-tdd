import { AppError } from './app-error'

export class InvalidTokenError extends AppError {
  constructor() {
    super('Invalid token', 401)
  }
}
