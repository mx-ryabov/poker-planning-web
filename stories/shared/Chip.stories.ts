import { Chip } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Shared/Chip",
	component: Chip,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onClick: fn() },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChipDefault: Story = {
	args: {
		text: "Chip",
		onClose() {},
	},
};

export const ChipOutlined: Story = {
	args: {
		text: "Chip",
		outlined: true,
		onClose() {},
	},
};

export const ChipDisabled: Story = {
	args: {
		text: "Chip",
		disabled: true,
	},
};

export const ChipOutlinedDisabled: Story = {
	args: {
		text: "Chip",
		outlined: true,
		disabled: true,
	},
};
