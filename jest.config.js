module.exports = {
  preset: '@shelf/jest-mongodb',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/mocks/',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/mocks/**',
    '!**/*config.*',
    '!**/lib/mongodb.ts',
    '!**/_app.tsx',
    '!**/.next/**',
  ],
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      lines: 90,
      functions: 90,
    },
  },
}
