const { IgnorePlugin } = require('webpack');

function withBundleSizeOptimization(nextConfig = {}) {
  return {
    ...nextConfig,
    webpack(config, options) {
      config.module.rules = [
        ...config.module.rules,
        // Optimize bundle size by shaking unnecessary barrel file exports
        // Ref: https://github.com/vercel/next.js/issues/12557#issuecomment-1196931845
        {
          test: /libs\/([\w-_]+\/)+src\/(lib\/)?(([\w-_]+\/)+)?index.ts/i,
          sideEffects: false,
        },
        {
          test: /tools\/(lib\/)?(([\w-_]+\/)+)?index.ts/i,
          sideEffects: false,
        },
        {
          test: /@jerry-serverless(\/[\w-_])+$/i,
          sideEffects: false,
        },
      ];

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
}

module.exports.withBundleSizeOptimization = withBundleSizeOptimization;

function withMomentLocalesIgnore(nextConfig = {}) {
  return {
    ...nextConfig,
    webpack(config, options) {
      config.plugins.push(
        new IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
}

module.exports.withMomentLocalesIgnore = withMomentLocalesIgnore;

function compose(plugins, config) {
  return function (_phase, { defaultConfig }) {
    return plugins.reduce(
      (acc, plugin) => {
        if (Array.isArray(plugin)) {
          return plugin[0](acc, plugin[1]);
        }
        return plugin(acc);
      },
      { ...config }
    );
  };
}

module.exports.compose = compose;
