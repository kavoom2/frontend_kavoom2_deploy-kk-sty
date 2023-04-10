const webpackScssWithCSSModules = require("./plugins/webpackScssWithCSSModules");
const path = require("path");

/**
 * @type {import('@storybook/react/types').StorybookConfig}
 */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  webpackFinal: async (config, { configType }) => {
    /**
     * @see https://lahuman.github.io/storybook_css_module/ Storybook CSS Module + SCSS 설정
     */
    config = webpackScssWithCSSModules(config);

    config.resolve.alias["@"] = path.resolve(__dirname, "../src/");

    return config;
  },
};

module.exports = config;
