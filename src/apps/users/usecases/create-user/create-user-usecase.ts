import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'

import { User, UserStatus } from '@entities/user'

import { UserRepository } from '@apps/users/repositories'
import { HashProvider } from '@providers/hash'
import { MailProvider } from '@providers/mail'
import { EmailAlreadyUserd } from '@apps/users/errors'

export type CreateUserRequest = {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private repository: UserRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
    @inject('MailProvider')
    private mailProvider: MailProvider
  ) { }

  async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    const userExists = await this.repository.findByEmail(email)

    if (userExists) {
      throw new EmailAlreadyUserd()
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
      status: UserStatus.registred
    })

    const buff = Buffer.from(user.email, 'utf-8')
    const emailBase64 = buff.toString('base64')

    const registrationTemplate = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'registration.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Larawork] - Confirmação de Cadastro',
      templateData: {
        file: registrationTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/confirmation?code=${emailBase64}`
        }
      }
    })

    return user
  }
}
