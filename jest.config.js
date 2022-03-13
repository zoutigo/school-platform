const config = {
  verbose: true,
  roots: ['<rootDir>/backend'],
  testMatch: [
    '<rootDir>/backend/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/backend/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/public/', '/files/', '/images/', '/frontend/'],
  moduleDirectories: ['node_modules', 'backend', __dirname],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
}

module.exports = config
