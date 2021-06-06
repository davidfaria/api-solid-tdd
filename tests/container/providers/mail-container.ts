import { container } from 'tsyringe'
import { MailProvider } from '@shared/container/providers/mail/mail-provider'
import { FakeMailProvider } from '@shared/container/providers/mail/implementations/fake-mail-provider'
container.registerSingleton<MailProvider>('MailProvider', FakeMailProvider)
