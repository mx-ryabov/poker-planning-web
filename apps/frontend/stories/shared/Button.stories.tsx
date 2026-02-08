import { Button } from "@/src/shared/ui/components/button";
import { ArrowRightIcon, SettingsIcon } from "@/src/shared/ui/components/icon";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn, within, expect } from "storybook/test";
import { useState } from "react";

const meta = {
	title: "Shared/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: { onPress: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
	args: {
		children: "Button",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const DefaultLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		isDisabled: true,
	},
	render: (args) => (
		<Button {...args}>
			<SettingsIcon size={18} />
			Button
			<ArrowRightIcon size={18} />
		</Button>
	),
};

export const DefaultLargePending: Story = {
	args: {
		...Default.args,
		size: "large",
		isPending: true,
	},
	render: (args) => (
		<Button {...args}>
			<SettingsIcon size={18} />
			Button
			<ArrowRightIcon size={18} />
		</Button>
	),
};

export const DefaultLarge: Story = {
	args: {
		...Default.args,
		size: "large",
	},
	render: (args) => <Button {...args}>Button</Button>,
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
	render: (args) => <Button {...args}>Button</Button>,
};

export const DefaultMediumPending = () => {
	const [isPending, setIsPending] = useState(false);
	return (
		<Button
			size="medium"
			appearance="danger"
			isPending={isPending}
			onPress={() => setIsPending(true)}
		>
			Button
		</Button>
	);
};

export const DefaultSmall: Story = {
	args: {
		...Default.args,
		size: "small",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const OutlineLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
		isDisabled: true,
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const OutlineLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
	},
	render: (args) => (
		<Button {...args}>
			<SettingsIcon size={18} />
			Button
		</Button>
	),
};

export const OutlineMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const OutlineMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
		isPending: true,
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const OutlineSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "outline",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GhostLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
		isDisabled: true,
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GhostLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GhostMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GhostMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
		isPending: true,
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GhostSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "ghost",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GrayedOutLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
		isDisabled: true,
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GrayedOutLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
	},
	render: (args) => (
		<Button {...args}>
			Button
			<ArrowRightIcon size={18} />
		</Button>
	),
};

export const GrayedOutMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GrayedOutMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
		isPending: true,
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const GrayedOutSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "grayed-out",
	},
	render: (args) => <Button {...args}>Button</Button>,
};
