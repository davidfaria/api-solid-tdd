/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv')

const getEnv = (env) => {
  const environments = {
    test: '.env.test',
    development: '.env.development',
    production: '.env.production'
  }

  return environments[env]
}
const NODE_ENV = process.env.NODE_ENV
const environment = getEnv(NODE_ENV || 'development')

// console.log(`Environment loaded: [${environment}]`)

dotenv.config({
  path: environment
})

const connection = {
  development: {
    logging: true
  },
  test: {
    logging: false,
    migrationsRun: true
  }
}

// console.log(`Load connection: ${environment}`)

module.exports = [
  {
    name: 'default',
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    cli: {
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
    },
    ...connection[NODE_ENV]
  }
]
