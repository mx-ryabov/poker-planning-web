import { FieldErrorIcon } from "@/_src/shared/ui/components/field-error-icon";
import type { Meta } from "@storybook/react";

const meta = {
	title: "Shared/FieldErrorIcon",
	component: FieldErrorIcon,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof FieldErrorIcon>;

export default meta;

export const FieldErrorIconDefault = (args: any) => {
	return <FieldErrorIcon errorMsg="Error!" {...args} />;
};
