import { Tag } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Shared/Tag",
	component: Tag,
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
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TagDefault: Story = {
	args: {
		text: "Tag",
		onClose() {},
	},
};

export const TagOutlined: Story = {
	args: {
		text: "Tag",
		outlined: true,
		onClose() {},
	},
};

export const TagDisabled: Story = {
	args: {
		text: "Tag",
		disabled: true,
	},
};

export const TagOutlinedDisabled: Story = {
	args: {
		text: "Tag",
		outlined: true,
		disabled: true,
	},
};
