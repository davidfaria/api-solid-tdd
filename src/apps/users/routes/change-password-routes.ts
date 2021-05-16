import { Router } from 'express'

import { ChangePasswordValidator } from '@apps/users/usecases/change-password/change-password-validator'
import { ChangePasswordController } from '@apps/users/usecases/change-password/change-password-controller'

const changePasswordRoutes = Router()

const changePasswordController = new ChangePasswordController()

changePasswordRoutes.post(
  '/change-password',
  ChangePasswordValidator,
  changePasswordController.handle
)

export { changePasswordRoutes }
