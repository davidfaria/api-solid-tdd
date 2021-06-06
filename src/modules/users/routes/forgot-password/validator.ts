import { celebrate, Segments, Joi } from 'celebrate'

export const ForgotPasswordCreateValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
})
