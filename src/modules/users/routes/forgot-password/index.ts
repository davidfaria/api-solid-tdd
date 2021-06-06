import { Router } from 'express'

import { ForgotPasswordCreateValidator } from './validator'
import { ForgotPasswordController } from '@modules/users/usecases/forgot-password/forgot-password-controller'

const forgotPasswordRoutes = Router()

const forgotPasswordController = new ForgotPasswordController()

forgotPasswordRoutes.post(
  '/forgot-password',
  ForgotPasswordCreateValidator,
  forgotPasswordController.handle
)

export { forgotPasswordRoutes }
