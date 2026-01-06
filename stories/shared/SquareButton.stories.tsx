import { Button } from "@/src/shared/ui/components/button";
import { SettingsIcon } from "@/src/shared/ui/components/icon";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Shared/ButtonSquare",
	component: Button,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
	// Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onPress: fn(), shape: "square" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
	args: {
		shape: "square",
		children: <SettingsIcon size={18} />,
	},
	render: (args) => <Button {...args} />,
};

export const DefaultLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		isDisabled: true,
	},
	render: (args) => <Button {...args} />,
};

export const DefaultLargePending: Story = {
	args: {
		...Default.args,
		size: "large",
		isPending: true,
	},
	render: (args) => <Button {...args} />,
};

export const DefaultLarge: Story = {
	args: {
		...Default.args,
		size: "large",
	},
	render: (args) => <Button {...args} />,
};

export const DefaultMedium = () => {
	return (
		<Button shape="square">
			<SettingsIcon size={18} />
		</Button>
	);
};

export const DefaultSmall: Story = {
	args: {
		...Default.args,
		size: "small",
	},
	render: (args) => <Button {...args} />,
};

export const OutlineLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
		isDisabled: true,
	},
	render: (args) => <Button {...args} />,
};

export const OutlineLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "outline",
	},
	render: (args) => <Button {...args} />,
};

export const OutlineMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "outline",
	},
	render: (args) => <Button {...args} />,
};

export const OutlineSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "outline",
	},
	render: (args) => <Button {...args} />,
};

export const GhostLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
		isDisabled: true,
	},
	render: (args) => <Button {...args} />,
};

export const GhostLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "ghost",
	},
	render: (args) => <Button {...args} />,
};

export const GhostMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "ghost",
	},
	render: (args) => <Button {...args} />,
};

export const GhostSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "ghost",
	},
	render: (args) => <Button {...args} />,
};

export const GrayedOutLargeDisabled: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
		isDisabled: true,
	},
	render: (args) => <Button {...args} />,
};

export const GrayedOutLarge: Story = {
	args: {
		...Default.args,
		size: "large",
		variant: "grayed-out",
	},
	render: (args) => <Button {...args} />,
};

export const GrayedOutMedium: Story = {
	args: {
		...Default.args,
		size: "medium",
		variant: "grayed-out",
	},
	render: (args) => <Button {...args} />,
};

export const GrayedOutSmall: Story = {
	args: {
		...Default.args,
		size: "small",
		variant: "grayed-out",
	},
	render: (args) => <Button {...args} />,
};
