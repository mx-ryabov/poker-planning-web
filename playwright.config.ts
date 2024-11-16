import { defineConfig, devices } from "next/experimental/testmode/playwright";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
// Seems not working. Check later why
dotenv.config({ path: path.resolve(__dirname, ".env") });

const isCI = !!process.env.CI;
const useBC = !!process.env.BROWSERCAT_API_KEY;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./e2e/tests",
	testMatch: "e2e/tests/**/*.spec.ts",
	outputDir: "./e2e/output",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: isCI,
	/* Retry on CI only */
	retries: useBC || isCI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: useBC ? 10 : isCI ? 1 : "50%",
	maxFailures: useBC && !isCI ? 0 : 3,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		[
			"html",
			{
				outputFolder: "./e2e/results",
				open: "never",
			},
		],
		isCI ? ["github"] : ["line"],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		connectOptions: useBC
			? {
					wsEndpoint: "wss://api.browsercat.com/connect",
					headers: { "Api-Key": process.env.BROWSERCAT_API_KEY! },
				}
			: undefined,
	},
	expect: {
		toHaveScreenshot: {
			maxDiffPixels: 100,
			stylePath: "./e2e/utils/next-dev-toasts-hider.css",
		},
	},
	snapshotPathTemplate:
		"./e2e/snapshots/{projectName}/{testFilePath}/{arg}{ext}",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],

	webServer: {
		command: "pnpm run dev",
		url: "http://localhost:3000",
		timeout: 120 * 1000,
		reuseExistingServer: !isCI,
	},
});
