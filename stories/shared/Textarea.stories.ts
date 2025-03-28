import { TextArea } from "@/_src/shared/ui/components/textarea";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Shared/TextArea",
	component: TextArea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaDefault: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
	},
};

export const TextAreaError: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		error: "This field is required",
	},
};

export const TextAreaErrorWithErrorIcon: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		withErrorIcon: true,
		error: "This field is required",
	},
};

export const TextAreaDisabled: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
		isDisabled: true,
	},
};

export const TextAreaPending: Story = {
	args: {
		label: "Label",
		value: "Check if text can be so long that it takes up several lines",
		placeholder: "Placeholder",
		isPending: true,
	},
};

export const TextAreaPendingAndErrorWithIcon: Story = {
	args: {
		label: "Label",
		value: "Check if text can be so long that it takes up several lines",
		placeholder: "Placeholder",
		withErrorIcon: true,
		error: "This field is required",
		isPending: true,
	},
};
