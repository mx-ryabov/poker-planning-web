import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

const config = defineConfig([
	...fsd.configs.recommended,
	{
		// ignore all test files for all rules
		ignores: ["**/*.test.tsx"],
	},
	{
		files: ["./_src/shared/**"],
		rules: {
			// disable public-api rule for files in /shared folder
			"fsd/no-public-api-sidestep": "off",
		},
	},
]);

export default config;
