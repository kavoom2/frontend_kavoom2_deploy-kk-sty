const path = require("path");

module.exports = function () {
  return {
    webpack: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        });

        return webpackConfig;
      },
    },
    jest: {
      configure: {
        coverageDirectory: "coverage",
        moduleNameMapper: {
          "^@/(.*)$": "<rootDir>/src/$1",
        },
      },
    },
  };
};
