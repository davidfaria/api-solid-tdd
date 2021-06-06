import { AppError } from '@shared/errors'

export class EmailAlreadyUserd extends AppError {
  constructor() {
    super('Email address already used', 400)
  }
}
