import { Dropdown, DropdownTrigger } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
	title: "Shared/Dropdown",
	component: DropdownTrigger,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof DropdownTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownDefault: Story = {
	args: {},
};
