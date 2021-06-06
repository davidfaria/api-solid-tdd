import { AppError } from '@errors/app-error'

export class InvalidCredentials extends AppError {
  constructor() {
    super('Email or password incorrect', 400)
  }
}
