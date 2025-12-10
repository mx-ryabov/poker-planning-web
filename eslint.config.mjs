import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: [
			"**/node_modules/**",
			"**/.next/**",
			"**/.turbo/**",
			"**/dist/**",
			"**/build/**",
			"**/.storybook/**",
			"**/coverage/**",
			"**/*.config.*",
			"**/*.md*",
		],
	},
	...next,
	...nextCoreWebVitals,
	// Storybook plugin temporarily removed - incompatible with Storybook 8.x
	// Upgrade to Storybook 10+ to re-enable: ...compat.extends("plugin:storybook/recommended"),
	...compat.extends("plugin:react/recommended"),
	...compat.extends("plugin:react/jsx-runtime"),
	...compat.extends("eslint:recommended"),
	...nextTypescript,
	{
		languageOptions: {
			parser: tsParser,
		},

		settings: {
			"import/resolver": {
				alias: {
					map: [
						["@/*", "./*"],
						["@ui/*", "./_src/shared/ui/*"],
					],
					extensions: [".ts", ".tsx"],
				},
			},

			dirs: ["_src"],
		},

		rules: {
			"no-unused-vars": "off",
			"react/display-name": "off",
			"no-mixed-spaces-and-tabs": "off",
			"@typescript-eslint/no-empty-object-type": "off",

			"max-depth": ["error", 5],
			"max-params": ["error", 3],

			"max-nested-callbacks": ["warn", 3],
		},
	},
	{
		files: ["_src/**", "app/**"],
		ignores: [
			"**/*.test.{ts,tsx}",
			"**/*.spec.{ts,tsx}",
			"**/__tests__/**/*.{ts,tsx}",
			"**/__mocks__/**/*.{ts,tsx}",
			"e2e/**/*.{ts,tsx}",
		],
		rules: {
			//complexity: ["error", 10],
		},
	},
	// Relax rules for test files
	{
		files: [
			"**/*.test.{ts,tsx}",
			"**/*.spec.{ts,tsx}",
			"**/__tests__/**/*.{ts,tsx}",
			"**/__mocks__/**/*.{ts,tsx}",
			"e2e/**/*.{ts,tsx}",
		],
		rules: {
			"max-nested-callbacks": ["warn", 5],
		},
	},
];
