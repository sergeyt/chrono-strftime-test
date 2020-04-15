const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname, "tests"),
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: path.resolve(__dirname, "tsconfig.json"),
    },
  },
  testMatch: ["**/(*.)+(spec|test|bench).[jt]s?(x)"],
  collectCoverage: false,
};
