import { Router } from 'express'

import { ResetPasswordValidator } from '@apps/users/usecases/reset-password/reset-password-validator'
import { ResetPasswordController } from '@apps/users/usecases/reset-password/reset-password-controller'

const resetPasswordRoutes = Router()

const resetPasswordController = new ResetPasswordController()

resetPasswordRoutes.post(
  '/reset-password',
  ResetPasswordValidator,
  resetPasswordController.handle
)

export { resetPasswordRoutes }
