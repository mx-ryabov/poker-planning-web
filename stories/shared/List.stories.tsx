import { List } from "@/_src/shared/ui/components/list";
import type { Meta } from "@storybook/react";

const meta = {
	title: "Shared/List",
	component: List,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;

type ItemData = { textValue: string; id: number; disabled?: boolean };
const data: ItemData[] = [
	{ textValue: "List Item 1", id: 1 },
	{ textValue: "List Item 2", id: 2 },
	{ textValue: "List Item 3", id: 3 },
	{ textValue: "List Item 4", id: 4 },
	{ textValue: "List Item 5", id: 5 },
];

export const ListDefault = () => (
	<List<ItemData>
		items={data}
		aria-label="List Default"
		className="border border-neutral-100 rounded-lg px-2 py-3"
	>
		{(item) => (
			<List.Item key={item.id} textValue={item.textValue}>
				{item.textValue}
			</List.Item>
		)}
	</List>
);

const dataWithDisabledItems: ItemData[] = [
	{ textValue: "List Item 1", id: 1 },
	{ textValue: "List Item 2", id: 2 },
	{ textValue: "List Item 3", id: 3, disabled: true },
	{ textValue: "List Item 4", id: 4 },
	{ textValue: "List Item 5", id: 5 },
];

export const ListWithDisabledItems = () => (
	<List<ItemData>
		items={dataWithDisabledItems}
		aria-label="List Default"
		className="border border-neutral-100 rounded-lg px-2 py-3"
	>
		{(item) => (
			<List.Item
				key={item.id}
				textValue={item.textValue}
				isDisabled={item.disabled}
			>
				{item.textValue}
			</List.Item>
		)}
	</List>
);

export const ListEmptyState = () => (
	<List<ItemData>
		items={[]}
		aria-label="List Default"
		className="border border-neutral-100 rounded-lg px-2 py-3"
	>
		{(item) => (
			<List.Item
				key={item.id}
				textValue={item.textValue}
				isDisabled={item.disabled}
			>
				{item.textValue}
			</List.Item>
		)}
	</List>
);
