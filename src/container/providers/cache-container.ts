import { container } from 'tsyringe'
import { CacheProvider, RedisCacheProvider } from '@providers/cache'

container.registerSingleton<CacheProvider>('CacheProvider', RedisCacheProvider)
