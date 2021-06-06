import { container } from 'tsyringe'

import { CacheProvider } from './cache-provider'
import { RedisCacheProvider } from './implementations/redis-provider'

container.registerSingleton<CacheProvider>('CacheProvider', RedisCacheProvider)
