import { container } from 'tsyringe'
import { HashProvider } from '@shared/container/providers/hash/hash-provider'
import { FakeHashProvider } from '@shared/container/providers/hash/implementations/fake-hash-provider'

container.registerSingleton<HashProvider>('HashProvider', FakeHashProvider)
