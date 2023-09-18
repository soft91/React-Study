module.exports = {
  snapshotSerializers: ['@emotion/jest/serializer'],
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'], // 테스트 파일 위치에 맞게 설정
  testEnvironmentOptions: {
    // allowContainerFirstChild를 true로 설정
    allowContainerFirstChild: true,
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
