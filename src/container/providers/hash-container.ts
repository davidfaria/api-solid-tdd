import { container } from 'tsyringe'
import { HashProvider, BCryptProvider } from '@providers/hash'

container.registerSingleton<HashProvider>('HashProvider', BCryptProvider)
