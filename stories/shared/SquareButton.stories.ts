import { ButtonSquare, SettingsIcon } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Shared/ButtonSquare",
	component: ButtonSquare,
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
} satisfies Meta<typeof ButtonSquare>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
	args: {
		icon: SettingsIcon,
	},
};

export const DefaultLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		disabled: true,
	},
};

export const DefaultLarge: Story = {
	args: {
		...Default.args,
		size: "large",
	},
};

export const DefaultMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
	},
};

export const DefaultSmall: Story = {
	args: {
		...Default.args,
		size: "small",
	},
};

export const OutlineLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "outline",
		disabled: true,
	},
};

export const OutlineLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "outline",
	},
};

export const OutlineMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		styleType: "outline",
	},
};

export const OutlineSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		styleType: "outline",
	},
};

export const GhostLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "ghost",
		disabled: true,
	},
};

export const GhostLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "ghost",
	},
};

export const GhostMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		styleType: "ghost",
	},
};

export const GhostSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		styleType: "ghost",
	},
};

export const GrayedOutLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "grayed-out",
		disabled: true,
	},
};

export const GrayedOutLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "grayed-out",
	},
};

export const GrayedOutMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		styleType: "grayed-out",
	},
};

export const GrayedOutSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		styleType: "grayed-out",
	},
};
