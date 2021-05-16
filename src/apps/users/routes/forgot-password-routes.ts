import { Router } from 'express'

import { ForgotPasswordCreateValidator } from '@apps/users/usecases/forgot-password/forgot-password-validator'
import { ForgotPasswordController } from '@apps/users/usecases/forgot-password/forgot-password-controller'

const forgotPasswordRoutes = Router()

const forgotPasswordController = new ForgotPasswordController()

forgotPasswordRoutes.post(
  '/forgot-password',
  ForgotPasswordCreateValidator,
  forgotPasswordController.handle
)

export { forgotPasswordRoutes }
