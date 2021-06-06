import { container } from 'tsyringe'
import { DateProvider } from './date-provider'
import { DateFnsProvider } from './implementations/date-fns-provider'

container.registerSingleton<DateProvider>('DateProvider', DateFnsProvider)
