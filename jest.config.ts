import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@components(.*)$': '<rootDir>/src/components',
    '^@ui(.*)$': '<rootDir>/src/components/ui',
    '^@ui-pages(.*)$': '<rootDir>/src/components/ui/pages',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types',
    '^@api(.*)$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices(.*)$': '<rootDir>/src/services/slices'
  }
};

export default config;
