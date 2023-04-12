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
     * Storybook CSS Module + SCSS 설정
     * @see https://lahuman.github.io/storybook_css_module/
     */
    config = webpackScssWithCSSModules(config);

    /**
     * Storybook Aliasing 설정
     */
    config.resolve.alias["@"] = path.resolve(__dirname, "../src/");

    /**
     * Storybook SVGR 설정
     * @see https://github.com/storybookjs/storybook/issues/11821
     */
    const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    };
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", assetLoader],
    });

    /**
     * Framer Motion 관련 이슈 대응
     */
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return webpackConfig;

    return config;
  },
};

module.exports = config;
