module.exports = {
  setupFiles: ['./src/testSetup.js'],
  transform: { '^.+\\.jsx?$': 'babel-jest' },
  testURL: 'http://pippin-ah-frontend.herokuapp.com/articles/science',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
