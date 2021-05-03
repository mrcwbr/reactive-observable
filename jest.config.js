module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^lodash-es$": "lodash", // https://stackoverflow.com/a/54117206/6003494
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
};
