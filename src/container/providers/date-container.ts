import { container } from 'tsyringe'
import { DateProvider, DateFnsProvider } from '@providers/date'

container.registerSingleton<DateProvider>('DateProvider', DateFnsProvider)
