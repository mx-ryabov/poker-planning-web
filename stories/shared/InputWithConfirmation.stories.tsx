import { InputWithConfirmation } from "@/_src/shared/ui/components/input-with-confirmation";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
	title: "Shared/InputWithConfirmation",
	component: InputWithConfirmation,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: { onChange: fn() },
} satisfies Meta<typeof InputWithConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputDefault = (args: any) => {
	return (
		<div>
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				{...args}
			/>
		</div>
	);
};

export const InputError: Story = {
	args: {
		label: "Label",
		placeholder: "Placeholder",
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
