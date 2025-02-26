import { PeopleIcon } from "@/_src/shared/ui/components/icon";
import { Input } from "@/_src/shared/ui/components/input";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Shared/Input",
	component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputDefault: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
	},
};

export const InputWithStartIcon: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		startIcon: PeopleIcon,
	},
};

export const InputError: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		startIcon: PeopleIcon,
		errors: ["This field is required"],
	},
};

export const InputErrorWithErrorIcon: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		startIcon: PeopleIcon,
		withErrorIcon: true,
		errors: ["This field is required"],
	},
};

export const InputDisabled: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		isDisabled: true,
	},
};

export const InputPending: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		isPending: true,
	},
};
