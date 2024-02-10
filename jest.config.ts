/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/config(.*)$': '<rootDir>/src/config$1',
  },
  preset: 'ts-jest',
}

export default createJestConfig(config)
