import { injectable } from 'tsyringe'

import nodemailer, { Transporter } from 'nodemailer'
import { MailProvider, SendMail } from '../mail-provider'
import { parserHtmlWithVariables } from '../parser-html-variables'
import { mailConfig } from '@config/mail'

@injectable()
export class EtherealMailProvider implements MailProvider {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      })

      this.client = transporter
    })
  }

  async sendMail({ to, from, subject, templateData }: SendMail): Promise<void> {
    const { name, email } = mailConfig.defaults.from

    const html = parserHtmlWithVariables(templateData)

    const message = await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
