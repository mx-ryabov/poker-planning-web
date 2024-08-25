import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfig from "./tsconfig.json";
import path from "path";

const alias = Object.fromEntries(
	Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
		key.replace("/*", ""),
		path.resolve(__dirname, value.replace("/*", "")),
	]),
);

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias,
	},
	test: {
		globals: true,
		setupFiles: path.resolve(__dirname, "test/setup.ts"),
		// if you don't enough the happy-dom you can change environment to the jsdom.
		// on the first line of your file where you need this you need to define // @vitest-environment jsdom
		environment: "happy-dom",
	},
});
