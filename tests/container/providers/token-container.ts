import { container } from 'tsyringe'
import { TokenProvider } from '@shared/container/providers/token/token-provider'
import { FakeTokenProvider } from '@shared/container/providers/token/implementations/fake-token-provider'

container.registerSingleton<TokenProvider>('TokenProvider', FakeTokenProvider)
