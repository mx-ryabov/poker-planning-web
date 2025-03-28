import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { SettingsIcon } from "@/_src/shared/ui/components/icon";
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
	// Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onPress: fn() },
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
		isDisabled: true,
	},
};

export const DefaultLargePending: Story = {
	args: {
		...Default.args,
		size: "large",
		isPending: true,
	},
};

export const DefaultLarge: Story = {
	args: {
		...Default.args,
		size: "large",
	},
};

export const DefaultMedium = () => {
	return <ButtonSquare icon={SettingsIcon} />;
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
		variant: "outline",
		isDisabled: true,
	},
};

export const OutlineLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
	},
};

export const OutlineMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
	},
};

export const OutlineSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "outline",
	},
};

export const GhostLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
		isDisabled: true,
	},
};

export const GhostLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
	},
};

export const GhostMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
	},
};

export const GhostSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "ghost",
	},
};

export const GrayedOutLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
		isDisabled: true,
	},
};

export const GrayedOutLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
	},
};

export const GrayedOutMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
	},
};

export const GrayedOutSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "grayed-out",
	},
};
