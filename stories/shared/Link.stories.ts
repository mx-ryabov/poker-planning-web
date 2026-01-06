import { Link } from "@/src/shared/ui/components/link";
import type { Meta, StoryObj } from "@storybook/nextjs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Shared/Link",
	component: Link,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkDefault: Story = {
	args: {
		children: "Text link",
	},
};
