import config from './jest.config'

export default {
  ...config,
  testMatch: ['**/src/**/?(*-integration.)+(spec|test).ts?(x)']
}
