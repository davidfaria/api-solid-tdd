import { Router } from 'express'
import { CreateUserValidator } from './validator'

import { CreateUserController } from '@modules/users/usecases/create-user/create-user-controller'
import { ListUserController } from '@modules/users/usecases/list-user/list-user-controller'

const userRoutes = Router()

const listUserController = new ListUserController()
const createUserController = new CreateUserController()

userRoutes.get('/users', listUserController.handle)
userRoutes.post('/users', CreateUserValidator, createUserController.handle)

export { userRoutes }
