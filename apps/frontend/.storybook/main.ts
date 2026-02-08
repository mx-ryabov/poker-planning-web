import type { StorybookConfig } from "@storybook/nextjs";

// const excludedProps = new Set([
// 	"id",
// 	"slot",
// 	"onCopy",
// 	"onCut",
// 	"onPaste",
// 	"onCompositionStart",
// 	"onCompositionEnd",
// 	"onCompositionUpdate",
// 	"onSelect",
// 	"onBeforeInput",
// 	"onInput",
// ]);
const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@chromatic-com/storybook",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	// it crashes interaction-and-accessibility job in git-hub actions workflow. but you can add it whenever it's really needed (i.e. there is something to put there)
	//staticDirs: ["..\\public"],

	// typescript: {
	// 	reactDocgen: "react-docgen-typescript",
	// 	reactDocgenTypescriptOptions: {
	// 		shouldExtractLiteralValuesFromEnum: true,
	// 		compilerOptions: {
	// 			allowSyntheticDefaultImports: false,
	// 			esModuleInterop: false,
	// 		},
	// 		propFilter: (prop) =>
	// 			!prop.name.startsWith("aria-") && !excludedProps.has(prop.name),
	// 	},
	// },aria-") && !excludedProps.has(prop.name),
};
export default config;
