import { Router } from 'express'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

import { authenticateRoutes } from '@apps/users/routes/authenticate-routes'
import { forgotPasswordRoutes } from '@apps/users/routes/forgot-password-routes'
import { resetPasswordRoutes } from '@apps/users/routes/reset-password-routes'
import { registerConfirmationRoutes } from '@apps/users/routes/register-confirmation-routes'
import { userRoutes } from '@apps/users/routes/user-routes'

const routes = Router()

routes.use(authenticateRoutes)
routes.use(registerConfirmationRoutes)
routes.use(forgotPasswordRoutes)
routes.use(resetPasswordRoutes)

routes.use(ensureAuthenticated)
routes.use(userRoutes)

export { routes }
