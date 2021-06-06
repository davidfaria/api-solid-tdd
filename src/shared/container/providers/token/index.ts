import { container } from 'tsyringe'
import { TokenProvider } from './token-provider'
import { JWTProvider } from './implementations/jwt-provider'

container.registerSingleton<TokenProvider>('TokenProvider', JWTProvider)
