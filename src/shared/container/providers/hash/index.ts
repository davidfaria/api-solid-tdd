import { container } from 'tsyringe'
import { HashProvider } from './hash-provider'
import { BCryptProvider } from './implementations/bcrypt-provider'

container.registerSingleton<HashProvider>('HashProvider', BCryptProvider)
