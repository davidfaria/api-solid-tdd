interface EnvConfig {
  node_env: 'production' | 'development' | 'test'
}

export const envConfig = {
  node_env: process.env.NODE_ENV || 'development'
} as EnvConfig
