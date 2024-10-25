import { RadioGroup } from "@/_src/shared/ui";
import { InfoIcon } from "@/_src/shared/ui/components/icon";
import type { Meta } from "@storybook/react";

const meta = {
	title: "Shared/RadioGroup",
	component: RadioGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const RadioGroupDefault = () => (
	<RadioGroup>
		<RadioGroup.Label>Radio group title</RadioGroup.Label>
		<RadioGroup.Radio value="1">Apple</RadioGroup.Radio>
		<RadioGroup.Radio value="2">Orange</RadioGroup.Radio>
		<RadioGroup.Radio value="3">Watermelon</RadioGroup.Radio>
	</RadioGroup>
);

export const RadioGroupContentInsideLarge = () => (
	<RadioGroup variant="content-inside" size="large">
		<RadioGroup.Label>Radio group title</RadioGroup.Label>
		<RadioGroup.Radio value="1">Apple</RadioGroup.Radio>
		<RadioGroup.Radio value="2">Orange</RadioGroup.Radio>
		<RadioGroup.Radio value="3">Watermelon</RadioGroup.Radio>
		<RadioGroup.Description>
			<InfoIcon /> Description
		</RadioGroup.Description>
	</RadioGroup>
);
