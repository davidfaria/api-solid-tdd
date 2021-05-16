import { container } from 'tsyringe'
import { MailProvider, FakeMailProvider } from '@providers/mail'
container.registerSingleton<MailProvider>('MailProvider', FakeMailProvider)
