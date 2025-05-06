export default {
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  collectCoverageFrom: [
    'src/components/*.js',
    'src/components/*.ts',
    'src/components/*.jsx',
    'src/components/*.tsx',
    '!src/index.js', // files you need to avoid in test coverage
    '!src/hooks/*.js',
    '!src/context/*.js',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['html', 'text'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
