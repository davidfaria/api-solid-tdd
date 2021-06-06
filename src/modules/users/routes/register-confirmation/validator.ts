import { celebrate, Segments, Joi } from 'celebrate'

export const RegisterValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
})
