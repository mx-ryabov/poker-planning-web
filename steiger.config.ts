import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

const config = defineConfig([
	...fsd.configs.recommended,
	{
		ignores: ["**/*.test.tsx"],
	},
	{
		files: ["./_src/shared/**"],
		rules: {
			"fsd/no-public-api-sidestep": "off",
		},
	},
	{
		files: ["./_src/shared/ui/**"],
		rules: {
			"fsd/public-api": "off",
		},
	},
]);

export default config;
