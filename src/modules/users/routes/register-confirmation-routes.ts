import { Router } from 'express'

import { RegisterConfirmationController } from '@modules/users/usecases/register-confirmation/register-confirmation-controller'

const registerConfirmationRoutes = Router()

const registerConfirmationController = new RegisterConfirmationController()

registerConfirmationRoutes.post(
  '/register-confirmation',
  registerConfirmationController.handle
)

export { registerConfirmationRoutes }
