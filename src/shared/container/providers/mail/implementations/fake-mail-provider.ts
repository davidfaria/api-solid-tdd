import { MailProvider, SendMail } from '@providers/mail'

export class FakeMailProvider implements MailProvider {
  messages: SendMail[] = []

  async sendMail({ to, from, subject, templateData }: SendMail): Promise<void> {
    this.messages.push({ to, from, subject, templateData })
  }
}
