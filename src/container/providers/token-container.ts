import { container } from 'tsyringe'
import { TokenProvider, JWTProvider } from '@providers/token'

container.registerSingleton<TokenProvider>('TokenProvider', JWTProvider)
