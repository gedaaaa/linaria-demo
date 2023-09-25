const os = require('os');
const _ = require('lodash');

const withNx = require('@nrwl/next/plugins/with-nx');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});
const { withLinaria: withNxLinaria } = require('nx-linaria');

const withLinaria = require('next-linaria');

const {
  withMomentLocalesIgnore,
  withBundleSizeOptimization,
  compose,
} = require('../../../libs/next-helpers/next-plugins');

const cpus = Math.min(Number(process.env.NEXT_MAX_THREAD_NUMBER) || (os.cpus() || [{}]).length, 64);
console.log(`> Will build with ${cpus} cpus`);

const nextConfig = {
  // use 'experimental-serverless-trace' we can have extracted dependencies with light weight page js.
  // BUT will also set useServerlessTraceTarget to true in serverless.yml
  target: 'experimental-serverless-trace',
  productionBrowserSourceMaps: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    cpus, // Cap number of build workers to optimal value for this app
    // fix for Next.js including inefficiently transpiled code https://github.com/reactjs/reactjs.org/pull/4682
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  async headers() {
    return process.env.SERVERLESS_STAGE !== 'prod'
      ? [
          {
            // Tell google not to index non-prod pages
            source: '/:path*',
            headers: [
              {
                key: 'X-Robots-Tag',
                value: 'noindex',
              },
            ],
          },
        ]
      : [];
  },
  async redirects() {
    return [];
  },
  publicRuntimeConfig: {},
  // https://nextjs.org/docs/app/api-reference/next-config-js/generateBuildId
  generateBuildId: async () => 'shared-storage',

  async rewrites() {
    return [];
  },
};

// Put in publicRuntimeConfig for project use
nextConfig.publicRuntimeConfig.basePath = nextConfig.basePath;

// withNx should be last plugin in chain
const plugins = [
  withBundleAnalyzer,
  [
    withLinaria,
    {
      swcMinify: true,
    },
  ],
  withNxLinaria,
  withMomentLocalesIgnore,
  withBundleSizeOptimization,
  withNx,
];

module.exports = compose(plugins, nextConfig);
