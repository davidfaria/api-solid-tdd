import { Router } from 'express'

import { RegisterValidator } from './validator'
import { RegisterConfirmationController } from '@modules/users/usecases/register-confirmation/register-confirmation-controller'

const registerConfirmationRoutes = Router()

const registerConfirmationController = new RegisterConfirmationController()

registerConfirmationRoutes.post(
  '/register-confirmation',
  RegisterValidator,
  registerConfirmationController.handle
)

export { registerConfirmationRoutes }
