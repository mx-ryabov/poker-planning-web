import { Autocomplete } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

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
				<Autocomplete.Section title="Section 1">
					<Autocomplete.Item key="1" textValue="Item 1">
						Item 1
					</Autocomplete.Item>
					<Autocomplete.Item key="2" textValue="Item 2">
						Item 2
					</Autocomplete.Item>
				</Autocomplete.Section>
				<Autocomplete.Item key="3" textValue="Item 3">
					Item 3
				</Autocomplete.Item>
			</Autocomplete>
		</div>
	),
};

const dataMultiple = [
	{ id: "1", textValue: "Apple" },
	{ id: "2", textValue: "Orange" },
	{ id: "3", textValue: "Avocado" },
	{ id: "4", textValue: "Watermelon" },
	{ id: "5", textValue: "Banana" },
	{ id: "6", textValue: "Mango" },
	{ id: "7", textValue: "Tomato" },
	{ id: "8", textValue: "Peach" },
	{ id: "9", textValue: "Pear" },
	{ id: "10", textValue: "Dragonfruit" },
	{ id: "11", textValue: "Pineapple" },
	{ id: "12", textValue: "Apricot" },
	{ id: "13", textValue: "Anus" },
	{ id: "14", textValue: "Anabolic" },
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
					<Autocomplete.Item key={item.id} textValue={item.textValue}>
						{item.textValue}
					</Autocomplete.Item>
				)}
			</Autocomplete>
		</div>
	),
};

export const AutocompleteControllable = (args: any) => {
	const [currentItems, setCurrentItems] = useState([dataMultiple[3]]);

	return (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Controlable"
				placeholder="Select something"
				onSelectionChange={(items) => {
					setCurrentItems(items);
				}}
				onQuery={(searchValue) => {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve(currentItems.slice(3, 5));
						}, 2000);
					});
				}}
				selectedKeys={currentItems.map((item) => item.id)}
				items={dataMultiple}
			>
				{(item) => (
					<Autocomplete.Item key={item.id} textValue={item.textValue}>
						{item.textValue}
					</Autocomplete.Item>
				)}
			</Autocomplete>
			<div>
				Selected item:{" "}
				<b>
					{currentItems.length > 0
						? JSON.stringify(currentItems)
						: "None"}
				</b>
			</div>
		</div>
	);
};

export const AutocompleteError: Story = {
	render: () => (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Single"
				selectionMode="single"
				placeholder="Select something"
				errorMessages={["Error"]}
			>
				<Autocomplete.Item key="1" textValue="Item 1">
					Item 1
				</Autocomplete.Item>
				<Autocomplete.Item key="2" textValue="Item 2">
					Item 2
				</Autocomplete.Item>
				<Autocomplete.Item key="3" textValue="Item 3">
					Item 3
				</Autocomplete.Item>
			</Autocomplete>
		</div>
	),
};

export const AutocompleteDisabled: Story = {
	render: () => (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Single"
				selectionMode="single"
				placeholder="Select something"
				isDisabled={true}
			>
				<Autocomplete.Item key="1" textValue="Item 1">
					Item 1
				</Autocomplete.Item>
				<Autocomplete.Item key="2" textValue="Item 2">
					Item 2
				</Autocomplete.Item>
				<Autocomplete.Item key="3" textValue="Item 3">
					Item 3
				</Autocomplete.Item>
			</Autocomplete>
		</div>
	),
};

export const AutocompleteDisabledItems: Story = {
	render: () => (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Single"
				selectionMode="single"
				placeholder="Select something"
				disabledKeys={["2"]}
			>
				<Autocomplete.Item key="1" textValue="Item 1">
					Item 1
				</Autocomplete.Item>
				<Autocomplete.Item key="2" textValue="Item 2">
					Item 2
				</Autocomplete.Item>
				<Autocomplete.Item key="3" textValue="Item 3">
					Item 3
				</Autocomplete.Item>
			</Autocomplete>
		</div>
	),
};
