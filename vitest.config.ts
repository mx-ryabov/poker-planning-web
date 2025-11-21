import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfig from "./tsconfig.json";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

const alias = Object.fromEntries(
	Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
		key.replace("/*", ""),
		path.resolve(__dirname, value.replace("/*", "")),
	]),
);

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias,
	},
	test: {
		root: ".",
		alias,
		globals: true,
		pool: "threads",
		setupFiles: path.resolve(__dirname, "test/setup.ts"),
		environment: "jsdom",
		include: ["./_src/**/*test.{ts,tsx}", "./app/**/*test.{ts,tsx}"],
		exclude: [...configDefaults.exclude, "**/*.spec.ts"],
		// browser: {
		// 	enabled: true,
		// 	provider: playwright() as any,
		// 	instances: [{ browser: "chromium" }],
		// },
		coverage: {
			provider: "v8",
			// thresholds: {
			// 	branches: 60,
			// 	lines: 60,
			// 	functions: 60,
			// 	statements: 60,
			// },
			enabled: true,
			reporter: ["html"],
			include: ["./_src/**/*test.{ts,tsx}", "./app/**/*test.{ts,tsx}"],
			exclude: [
				"**/index.ts",
				"**/dto/**",
				"**/types/**",
				"**/shared/api/**",
			],
		},
	},
});
