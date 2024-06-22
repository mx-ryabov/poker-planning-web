import { Autocomplete } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Shared/Autocomplete",
	component: Autocomplete,
	parameters: {
		//layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const data = [];

export const AutocompleteSingle: Story = {
	render: () => (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Single"
				selectionMode="single"
				placeholder="Select something"
			>
				<Autocomplete.Section>
					<Autocomplete.Item id="1" key="1" textValue="Item 1">
						Item 1
					</Autocomplete.Item>
					<Autocomplete.Item id="2" key="2" textValue="Item 2">
						Item 2
					</Autocomplete.Item>
				</Autocomplete.Section>
				<Autocomplete.Item id="3" key="3" textValue="Item 3">
					Item 3
				</Autocomplete.Item>
			</Autocomplete>
		</div>
	),
};

const dataMultiple = [
	{ id: 1, textValue: "Item 1" },
	{ id: 2, textValue: "Item 2" },
	{ id: 3, textValue: "Item 3" },
	{ id: 4, textValue: "Item 4" },
	{ id: 5, textValue: "Item 5" },
	{ id: 6, textValue: "Item 6" },
	{ id: 7, textValue: "Item 7" },
	{ id: 8, textValue: "Item 8" },
	{ id: 9, textValue: "Item 9" },
	{ id: 10, textValue: "Item 10" },
	{ id: 11, textValue: "Item 11" },
	{ id: 12, textValue: "Item 12" },
	{ id: 13, textValue: "Item 13" },
	{ id: 14, textValue: "Item 14" },
	{ id: 15, textValue: "Item 15" },
	{ id: 16, textValue: "Item 16" },
	{ id: 17, textValue: "Item 17" },
];

export const AutocompleteMultiple: Story = {
	render: () => (
		<div className="w-[300px]">
			<Autocomplete
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Select something"
				items={dataMultiple}
			>
				{(item) => (
					<Autocomplete.Item
						id={item.id}
						key={item.id}
						textValue={item.textValue}
					>
						<span className="scale-100">{item.textValue}</span>
					</Autocomplete.Item>
				)}
			</Autocomplete>
		</div>
	),
};

export const AutocompleteError: Story = {
	render: () => <div className="w-[200px]"></div>,
};

export const AutocompleteDisabled: Story = {
	render: () => <div className="w-[200px]"></div>,
};
