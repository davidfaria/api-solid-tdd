import { container } from 'tsyringe'
import { HashProvider, FakeHashProvider } from '@providers/hash'

container.registerSingleton<HashProvider>('HashProvider', FakeHashProvider)
