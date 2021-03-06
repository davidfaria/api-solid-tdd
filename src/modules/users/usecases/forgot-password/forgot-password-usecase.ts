import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'
import { UserRepository } from '@modules/users/repositories'
import { UserNotFound } from '@modules/users/errors'
import { MailProvider } from '@shared/container/providers/mail/mail-provider'
import { User } from '@modules/users/entities/user'

export type ForgotPasswordRequest = {
  email: string
}
@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private repository: UserRepository,
    @inject('MailProvider')
    private mailProvider: MailProvider
  ) { }

  async execute({ email }: ForgotPasswordRequest): Promise<User> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new UserNotFound()
    }

    const token = uuid()

    user.forgot = token
    user.forgot_at = new Date()

    await this.repository.save(user)

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot-password.hbs'
    )

    // console.log({ mailProvider: this.mailProvider })

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Larawork] - Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/change-password?code=${token}`
        }
      }
    })

    return user
  }
}
