import { Button } from "@/_src/shared/ui/components/button";
import { Tooltip } from "@/_src/shared/ui/components/tooltip";
import type { Meta } from "@storybook/nextjs";

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

export const TooltipDefault = () => {
	return (
		<Tooltip defaultOpen={true}>
			<Button title="Trigger" />
			<Tooltip.Content>Content</Tooltip.Content>
		</Tooltip>
	);
};

export const TooltipWithCustomClassName = () => {
	return (
		<Tooltip defaultOpen={true}>
			<Button title="Trigger" />
			<Tooltip.Content className="bg-info-500 text-white">
				Content
			</Tooltip.Content>
		</Tooltip>
	);
};
