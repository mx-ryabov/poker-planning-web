import { Switch } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
	title: "Shared/Switch",
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: { onChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchDefault: Story = {
	args: {
		label: "Switch label",
	},
};

export const SwitchDisabled: Story = {
	args: {
		disabled: true,
		defaultSelected: true,
		label: "Switch label",
	},
};
