// eslint-disable-next-line no-undef
module.exports = {
  rootDir: 'src',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react)'],
  setupFilesAfterEnv: ['../src/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src'],
  clearMocks: true,
};
