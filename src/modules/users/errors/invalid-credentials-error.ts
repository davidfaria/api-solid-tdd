import { AppError } from '@shared/errors'

export class InvalidCredentials extends AppError {
  constructor() {
    super('Email or password incorrect', 400)
  }
}
