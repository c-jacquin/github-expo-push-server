module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*',
    '!src/**/*.json',
    '!src/database.ts',
    '!src/entity/*.ts',
    '!src/services/models/*.ts',
    '!src/services/Logger.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testMatch: ['**/__tests__/*.(ts|tsx|js)'],
  mapCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [ 'text', 'lcov' ],
  setupFiles: [
    './scripts/tests/test-setup.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/'
  ],
  transform: {
    '.(js|jsx)': '<rootDir>/node_modules/babel-jest',
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  }
}
