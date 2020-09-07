const shared = {
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/$1',
  },
  setupFiles: [
    '<rootDir>/tests/setup.ts',
  ],
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
};
