const webpackScssWithCSSModules = require("./plugins/webpackScssWithCSSModules");

/**
 * @type {import('@storybook/react/types').StorybookConfig}
 */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  webpackFinal: async (config, { configType }) => {
    /**
     * @see https://lahuman.github.io/storybook_css_module/ Storybook CSS Module + SCSS 설정
     */
    config = webpackScssWithCSSModules(config);

    return config;
  },
};

module.exports = config;
