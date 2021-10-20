const config = {
  verbose: true,
  roots: ['<rootDir>/src'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleDirectories: ['node_modules', 'src', 'src/utils', __dirname],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
}

module.exports = config
