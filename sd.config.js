module.exports = {
  source: ["./style-dictionary/properties/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "./src/styles/",
      prefix: "token",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}
