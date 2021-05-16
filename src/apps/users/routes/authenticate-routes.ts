import { Router } from 'express'

import { AuthenticateValidator } from '@apps/users/usecases/authenticate/authenticate-validator'
import { AuthenticateController } from '@apps/users/usecases/authenticate/authenticate-controller'

const authenticateRoutes = Router()

const authenticateController = new AuthenticateController()

authenticateRoutes.post(
  '/authenticate',
  AuthenticateValidator,
  authenticateController.handle
)

export { authenticateRoutes }
