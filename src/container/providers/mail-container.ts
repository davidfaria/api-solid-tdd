import { container } from 'tsyringe'
// import { mailConfig } from '@config/mail'

import {
  MailProvider,
  EtherealMailProvider
  // SESMailProvider
} from '@providers/mail'

// const getProvider = () => {
//   if (mailConfig.driver === 'ethereal') {
//     return EtherealMailProvider
//   }

//   return SESMailProvider
// }

container.registerSingleton<MailProvider>('MailProvider', EtherealMailProvider)
