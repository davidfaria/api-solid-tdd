import config from './jest.config'

export default {
  ...config,
  testMatch: ['**/src/**/?(*-usecase.)+(spec|test).ts?(x)']
}
