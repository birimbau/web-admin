const shared = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = {
  projects: [
    {
      ...shared,
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.ts'],
    },
    {
      ...shared,
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.ts'],
    },
  ],
  setupFiles: [
    '<rootDir>/tests/setup.ts',
  ],
};
