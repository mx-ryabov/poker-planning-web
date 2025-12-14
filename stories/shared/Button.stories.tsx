import { Button } from "@/_src/shared/ui/components/button";
import { ArrowRightIcon, SettingsIcon } from "@/_src/shared/ui/components/icon";
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
		title: "Button",
		form: "default",
	},
};

export const DefaultLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		isDisabled: true,
		contentLeft: SettingsIcon({ size: 18 }),
		contentRight: ArrowRightIcon({ size: 18 }),
	},
};

export const DefaultLargePending: Story = {
	args: {
		...Default.args,
		size: "large",
		isPending: true,
		contentLeft: SettingsIcon({ size: 18 }),
		contentRight: ArrowRightIcon({ size: 18 }),
	},
};

export const DefaultLarge: Story = {
	args: {
		...Default.args,
		size: "large",
	},
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
};

export const DefaultMediumPending = () => {
	const [isPending, setIsPending] = useState(false);
	return (
		<Button
			title="Button"
			form="default"
			size="medium"
			appearance="danger"
			isPending={isPending}
			onPress={() => setIsPending(true)}
		/>
	);
};

export const DefaultSmall: Story = {
	args: {
		...Default.args,
		size: "small",
	},
};

export const OutlineLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
		isDisabled: true,
	},
};

export const OutlineLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
		contentLeft: SettingsIcon({ size: 18 }),
	},
};

export const OutlineMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
	},
};

export const OutlineMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
		isPending: true,
	},
};

export const OutlineSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "outline",
	},
};

export const GhostLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
		isDisabled: true,
	},
};

export const GhostLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
	},
};

export const GhostMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
	},
};

export const GhostMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
		isPending: true,
	},
};

export const GhostSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "ghost",
	},
};

export const GrayedOutLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
		isDisabled: true,
	},
};

export const GrayedOutLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
		contentRight: ArrowRightIcon({ size: 18 }),
	},
};

export const GrayedOutMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
	},
};

export const GrayedOutMediumPending: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
		isPending: true,
	},
};

export const GrayedOutSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "grayed-out",
	},
};
