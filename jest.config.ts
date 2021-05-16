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
    '<rootDir>/src/apps/**/*.ts',
    '<rootDir>/src/utils/**/*.ts',
    '!<rootDir>/src/apps/**/index.ts',
    '!<rootDir>/src/apps/**/*-interface.ts',
    '!<rootDir>/src/apps/**/*-validator.ts',
    '!<rootDir>/src/apps/**/*-controller.ts',
    '!<rootDir>/src/apps/**/*-factory.ts',
    '!<rootDir>/src/apps/**/*-routes.ts',
    '!<rootDir>/src/apps/**/repositories/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/.jest/', '<rootDir>/src/', '<rootDir>/tests/']
}
