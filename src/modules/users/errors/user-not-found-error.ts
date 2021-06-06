import { AppError } from '@shared/errors'

export class UserNotFound extends AppError {
  constructor() {
    super('User does not exists', 404)
  }
}
