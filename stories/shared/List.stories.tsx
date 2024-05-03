import { List } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Shared/List",
	component: List,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

const data = [
	{ textValue: "List Item 1" },
	{ textValue: "List Item 2" },
	{ textValue: "List Item 3", disabled: true },
	{ textValue: "List Item 4" },
	{ textValue: "List Item 5" },
];

const itemClassName = `pl-3 pr-5 py-2 items-center cursor-pointer transition-colors gap-2
                            text-neutral-500 text-sm font-normal
                            hover:bg-neutral-100
                            active:bg-neutral-200
                            aria-disabled:text-neutral-200 aria-disabled:hover:bg-white aria-disabled:cursor-default`;

export const ListDefault: Story = {
	render: () => (
		<List onAction={(id) => console.log(id)}>
			<List.Section
				title="Dropdown Title"
				showDivider
				className={{
					title: "text-neutral-500 text-xs font-medium py-1 scale-100",
				}}
			>
				<List.Item
					className={itemClassName}
					key={"List Item 1"}
					id={"List Item 1"}
				>
					List Item 1
				</List.Item>
				<List.Item
					className={itemClassName}
					key={"List Item 2"}
					id={"List Item 2"}
				>
					List Item 2
				</List.Item>
				<List.Item
					className={itemClassName}
					key={"List Item 3"}
					id={"List Item 3"}
				>
					List Item 3
				</List.Item>
			</List.Section>
			<List.Item
				className={itemClassName}
				key={"List Item 4"}
				id={"List Item 4"}
			>
				List Item 4
			</List.Item>
			<List.Item
				className={itemClassName}
				key={"List Item 5"}
				id={"List Item 5"}
			>
				List Item 5
			</List.Item>
		</List>
	),
};
