module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "(\\.|/)(test|spec)\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  modulePathIgnorePatterns: ["node_modules"],
};
