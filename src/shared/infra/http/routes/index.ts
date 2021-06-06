import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares'

import { authenticateRoutes } from '@modules/users/routes/authenticate'
import { forgotPasswordRoutes } from '@modules/users/routes/forgot-password'
import { resetPasswordRoutes } from '@modules/users/routes/reset-password'
import { registerConfirmationRoutes } from '@modules/users/routes/register-confirmation'
import { userRoutes } from '@modules/users/routes/user'

const routes = Router()

routes.use(authenticateRoutes)
routes.use(registerConfirmationRoutes)
routes.use(forgotPasswordRoutes)
routes.use(resetPasswordRoutes)

routes.use(ensureAuthenticated)
routes.use(userRoutes)

export { routes }
