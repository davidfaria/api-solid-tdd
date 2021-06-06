import { AppError } from '@errors/app-error'

export class EmailAlreadyUserd extends AppError {
  constructor() {
    super('Email address already used', 400)
  }
}
