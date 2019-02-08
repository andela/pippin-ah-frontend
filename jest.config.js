module.exports = {
  setupFiles: ['./testSetup.js'],
  transform: { '^.+\\.jsx?$': 'babel-jest' },
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/filemock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
