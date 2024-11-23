import { Button } from "@/_src/shared/ui/components/button";
import { Tooltip } from "@/_src/shared/ui/components/tooltip";
import type { Meta } from "@storybook/react";

const meta = {
	title: "Shared/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;

export const TooltipDefault = (args: any) => {
	return (
		<Tooltip {...args} defaultOpen={true}>
			<Button title="Trigger" />
			<Tooltip.Content>Content</Tooltip.Content>
		</Tooltip>
	);
};

export const TooltipWithCustomClassName = (args: any) => {
	return (
		<Tooltip {...args} defaultOpen={true}>
			<Button title="Trigger" />
			<Tooltip.Content className="bg-info-500 text-white">
				Content
			</Tooltip.Content>
		</Tooltip>
	);
};
