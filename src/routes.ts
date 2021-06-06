import { Router } from 'express'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated'

import { authenticateRoutes } from '@modules/users/routes/authenticate-routes'
import { forgotPasswordRoutes } from '@modules/users/routes/forgot-password-routes'
import { resetPasswordRoutes } from '@modules/users/routes/reset-password-routes'
import { registerConfirmationRoutes } from '@modules/users/routes/register-confirmation-routes'
import { userRoutes } from '@modules/users/routes/user-routes'

const routes = Router()

routes.use(authenticateRoutes)
routes.use(registerConfirmationRoutes)
routes.use(forgotPasswordRoutes)
routes.use(resetPasswordRoutes)

routes.use(ensureAuthenticated)
routes.use(userRoutes)

export { routes }
