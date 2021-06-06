import { container } from 'tsyringe'
// import { mailConfig } from '@config/mail'

import { MailProvider } from './mail-provider'
import { EtherealMailProvider } from './implementations/ethereal-provider'

// const getProvider = () => {
//   if (mailConfig.driver === 'ethereal') {
//     return EtherealMailProvider
//   }

//   return SESMailProvider
// }

container.registerSingleton<MailProvider>('MailProvider', EtherealMailProvider)
