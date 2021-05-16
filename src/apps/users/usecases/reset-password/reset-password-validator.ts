import { celebrate, Segments, Joi } from 'celebrate'

export const ResetPasswordValidator = celebrate({
  [Segments.BODY]: {
    token: Joi.string().guid(),
    password: Joi.string().required(),
    password_confirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
  }
})
