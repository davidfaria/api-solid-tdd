import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'

export default {
  testMatch: ['**/tests/**/?(*.)+(spec|test).ts?(x)'],
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.ts',
    '<rootDir>/src/utils/**/*.ts',
    '!<rootDir>/src/modules/**/index.ts',
    '!<rootDir>/src/modules/**/*-interface.ts',
    '!<rootDir>/src/modules/**/*-validator.ts',
    '!<rootDir>/src/modules/**/*-controller.ts',
    '!<rootDir>/src/modules/**/*-factory.ts',
    '!<rootDir>/src/modules/**/*-routes.ts',
    '!<rootDir>/src/modules/**/repositories/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/.jest/', '<rootDir>/src/', '<rootDir>/tests/']
}
