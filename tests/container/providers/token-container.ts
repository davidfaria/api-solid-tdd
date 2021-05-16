import { container } from 'tsyringe'
import { TokenProvider, FakeTokenProvider } from '@providers/token'

container.registerSingleton<TokenProvider>('TokenProvider', FakeTokenProvider)
