const localesPlugin = require('@react-aria/optimize-locales-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack(config, {isServer}) {
    if (!isServer) {
      // Don't include any locale strings in the client JS bundle.
      config.plugins.push(localesPlugin.webpack({locales: []}));
    }
    return config;
  },
  experimental: {
    testProxy: true,
    serverComponentsHmrCache: false,
    optimizePackageImports: ["@/_src/shared/ui"]
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
   
module.exports = withBundleAnalyzer(nextConfig)
