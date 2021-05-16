import { MailProvider, SendMail } from '@providers/mail'

export class FakeMailProvider implements MailProvider {
  emails: SendMail[] = []

  async sendMail({ to, from, subject, templateData }: SendMail): Promise<void> {
    // console.log('Send Mail:', { to, subject })
    this.emails.push({ to, from, subject, templateData })
  }
}
