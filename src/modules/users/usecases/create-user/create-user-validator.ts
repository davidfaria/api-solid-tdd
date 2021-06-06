import { celebrate, Segments, Joi } from 'celebrate'

export const CreateUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
})
