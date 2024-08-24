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
		environment: "jsdom",
	},
});
