// 注意事项：babel-jest@24+只支持babel7，要支持babel6要使用23.6
module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'vue'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss)$': '<rootDir>/node_modules/identity-obj-proxy'
    },
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
    collectCoverage: false,
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: 'test/_coverage',
    collectCoverageFrom: ['src/**/*.{js,vue}', '!**/__config__/**'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    testResultsProcessor: 'jest-sonar-reporter'
};
