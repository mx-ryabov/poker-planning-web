import { NewButton } from "@/_src/shared/ui/components/button";
import { ArrowRightIcon, SettingsIcon } from "@/_src/shared/ui/components/icon";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn, within, expect } from "storybook/test";
import { useState } from "react";

const meta = {
	title: "Shared/Button",
	component: NewButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: { onPress: fn() },
} satisfies Meta<typeof NewButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
	args: {
		children: "Button",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const DefaultLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		isDisabled: true,
	},
	render: (args) => (
		<NewButton {...args}>
			<SettingsIcon size={18} />
			Button
			<ArrowRightIcon size={18} />
		</NewButton>
	),
};

export const DefaultLargePending: Story = {
	args: {
		...Default.args,
		size: "large",
		isPending: true,
	},
	render: (args) => (
		<NewButton {...args}>
			<SettingsIcon size={18} />
			Button
			<ArrowRightIcon size={18} />
		</NewButton>
	),
};

export const DefaultLarge: Story = {
	args: {
		...Default.args,
		size: "large",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		expect(button).toHaveStyle({
			height: "56px",
		});
	},
};

export const DefaultMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const DefaultMediumPending = () => {
	const [isPending, setIsPending] = useState(false);
	return (
		<NewButton
			size="medium"
			appearance="danger"
			isPending={isPending}
			onPress={() => setIsPending(true)}
		>
			Button
		</NewButton>
	);
};

export const DefaultSmall: Story = {
	args: {
		...Default.args,
		size: "small",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const OutlineLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
		isDisabled: true,
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const OutlineLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
	},
	render: (args) => (
		<NewButton {...args}>
			<SettingsIcon size={18} />
			Button
		</NewButton>
	),
};

export const OutlineMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const OutlineMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
		isPending: true,
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const OutlineSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "outline",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GhostLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
		isDisabled: true,
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GhostLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GhostMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GhostMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
		isPending: true,
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GhostSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "ghost",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GrayedOutLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
		isDisabled: true,
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GrayedOutLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
	},
	render: (args) => (
		<NewButton {...args}>
			Button
			<ArrowRightIcon size={18} />
		</NewButton>
	),
};

export const GrayedOutMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GrayedOutMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
		isPending: true,
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};

export const GrayedOutSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "grayed-out",
	},
	render: (args) => <NewButton {...args}>Button</NewButton>,
};
