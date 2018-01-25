module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
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
    './scripts/tests/test-setup.ts'
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
