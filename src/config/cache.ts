import { RedisOptions } from 'ioredis'

interface CacheConfig {
  driver: 'redis'

  config: {
    redis: RedisOptions
  }
}

export const cacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASS || undefined
    }
  }
} as CacheConfig
