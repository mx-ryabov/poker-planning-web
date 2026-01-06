import { FieldErrorIcon } from "@/src/shared/ui/components/field-error-icon";
import type { Meta } from "@storybook/nextjs";

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

export const FieldErrorIconDefault = () => {
	return <FieldErrorIcon errorMsg="Error!" />;
};
