module.exports = {
  verbose: true,
  moduleFileExtensions: [
    "js",
    "mjs",
    "json"
  ],
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,mjs}"
  ],
  coverageReporters: [
    "html",
    "text-summary"
  ],
  cache: false,
}
