import {
  MailProvider,
  SendMail
} from '@shared/container/providers/mail/mail-provider'

export class FakeMailProvider implements MailProvider {
  messages: SendMail[] = []

  async sendMail({ to, from, subject, templateData }: SendMail): Promise<void> {
    this.messages.push({ to, from, subject, templateData })
  }
}
