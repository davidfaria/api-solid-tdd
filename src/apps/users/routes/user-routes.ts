import { Router } from 'express'

import { CreateUserController } from './../usecases/create-user/create-user-controller'
import { ListUserController } from '@apps/users/usecases/list-user/list-user-controller'

import { CreateUserValidator } from '../usecases/create-user/create-user-validator'

const userRoutes = Router()

const listUserController = new ListUserController()
const createUserController = new CreateUserController()

userRoutes.get('/users', listUserController.handle)
userRoutes.post('/users', CreateUserValidator, createUserController.handle)

export { userRoutes }
