const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {'^@/(.*)$': '<rootDir>/src/$1'},
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
     'node_modules/(?!(next-intl)/)'
    ],
};

module.exports = createJestConfig(customJestConfig);
