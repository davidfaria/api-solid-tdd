import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'

import { MailProvider, SendMail } from '../mail-provider'
import { parserHtmlWithVariables } from '../parser-html-variables'

import { mailConfig } from '@config/mail'

@injectable()
export class SESMailProvider implements MailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    })
  }

  async sendMail({ to, from, subject, templateData }: SendMail): Promise<void> {
    const { name, email } = mailConfig.defaults.from
    const html = parserHtmlWithVariables(templateData)

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      }, // sender address
      to: {
        name: to.name,
        address: to.email
      },
      subject, // Subject line
      html
    })
  }
}
