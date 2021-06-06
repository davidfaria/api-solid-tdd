import { AppError } from '@shared/errors'

export class TokenNotFound extends AppError {
  constructor() {
    super('User token does not exists', 404)
  }
}
