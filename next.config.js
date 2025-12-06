const withPlugins = require("next-compose-plugins");
const localesPlugin = require("@react-aria/optimize-locales-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const { withSentryConfig } = require("@sentry/nextjs");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins([withBundleAnalyzer], {
	...(process.env.NODE_ENV === "production" && { output: "standalone" }),
	webpack(config, { isServer, dev }) {
		if (!isServer) {
			// Don't include any locale strings in the client JS bundle.
			config.plugins.push(localesPlugin.webpack({ locales: [] }));
			if (process.env.ANALYZE === "true") {
				config.plugins.push(
					new StatsWriterPlugin({
						filename: "../stats.json",
						stats: {
							assets: true,
							chunks: true,
							modules: true,
						},
					}),
				);
			}
		}
		return config;
	},
	experimental: {
		testProxy: true,
		serverComponentsHmrCache: false,
		optimizePackageImports: [
			"@/_src/shared/ui",
			"react-aria",
			"react-aria-components",
			"@react-aria/selection",
			"chart.js",
			"react-chartjs-2",
			"gsap",
			"@gsap/react",
			"@sentry/nextjs",
		],
	},
});

module.exports = withSentryConfig(nextConfig, {
	// For all available options, see:
	// https://www.npmjs.com/package/@sentry/webpack-plugin#options

	org: "personal-poker-planning-app",
	project: "javascript-nextjs",

	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,

	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: false,

	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: "/monitoring",

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,

	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
	// See the following for more information:
	// https://docs.sentry.io/product/crons/
	// https://vercel.com/docs/cron-jobs
	automaticVercelMonitors: false,
	bundleSizeOptimizations: {
		excludeDebugStatements: true,
		// Only relevant if you added `browserTracingIntegration`
		excludePerformanceMonitoring: true,
		// Only relevant if you added `replayIntegration`
		excludeReplayIframe: true,
		excludeReplayShadowDom: true,
		excludeReplayWorker: true,
	},
});
