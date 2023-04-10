const path = require("path");

module.exports = function () {
  return {
    webpack: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    jest: {
      configure: {
        moduleNameMapper: {
          "^@/(.*)$": "<rootDir>/src/$1",
        },
      },
    },
  };
};
