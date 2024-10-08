import { ArrowRightIcon, Button, SettingsIcon } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn, within, expect } from "@storybook/test";

const meta = {
	title: "Shared/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: { onPress: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
	args: {
		title: "Button",
		form: "default",
	},
};

export const DefaultLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		isDisabled: true,
		iconLeft: SettingsIcon,
		iconRight: ArrowRightIcon,
	},
};

export const DefaultLarge: Story = {
	args: {
		...Default.args,
		size: "large",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		expect(button).toHaveStyle({
			height: "56px",
			// paddingLeft: "16px",
			// paddingRight: "16px",
		});
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
		isDisabled: true,
	},
};

export const OutlineLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "outline",
		iconLeft: SettingsIcon,
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
		isDisabled: true,
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
		isDisabled: true,
	},
};

export const GrayedOutLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		styleType: "grayed-out",
		iconRight: ArrowRightIcon,
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
