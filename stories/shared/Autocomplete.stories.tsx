import { Autocomplete } from "@/_src/shared/ui/components/autocomplete";
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

export const AutocompleteSingleStatefull: Story = {
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

type ItemT = {
	id: string;
	textValue: string;
};

const dataMultiple: ItemT[] = [
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

type SectionT = {
	id: string;
	title: string;
	items: ItemT[];
};
const dataMultipleWithSections: SectionT[] = [
	{
		id: "1",
		title: "Fruits",
		items: [
			{ id: "1", textValue: "Apple" },
			{ id: "2", textValue: "Orange" },
			{ id: "3", textValue: "Avocado" },
			{ id: "4", textValue: "Watermelon" },
			{ id: "5", textValue: "Banana" },
			{ id: "6", textValue: "Mango" },
		],
	},
	{
		id: "2",
		title: "Vegetables",
		items: [
			{ id: "7", textValue: "Tomato" },
			{ id: "8", textValue: "Peach" },
			{ id: "9", textValue: "Pear" },
			{ id: "10", textValue: "Dragonfruit" },
			{ id: "11", textValue: "Pineapple" },
			{ id: "12", textValue: "Apricot" },
			{ id: "13", textValue: "Anus" },
			{ id: "14", textValue: "Anabolic" },
		],
	},
];

export const AutocompleteSingleStateless: Story = {
	render: () => (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Single"
				selectionMode="single"
				placeholder="Search and select options..."
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

export const AutocompleteSingleControllable = (_args: any) => {
	const [currentItems, setCurrentItems] = useState([dataMultiple[3]]);

	return (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Controlable"
				placeholder="Search and select options..."
				onSelectionChange={(items) => {
					setCurrentItems(items as ItemT[]);
				}}
				onQuery={(_searchValue) => {
					return new Promise((resolve) => {
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

export const AutocompleteSingleWithSections = () => {
	const [currentItems, setCurrentItems] = useState<
		{ id: string; textValue: string }[]
	>([dataMultipleWithSections[0].items[3]]);

	return (
		<div className="w-[300px]">
			<Autocomplete<ItemT>
				label="Select Multiple"
				selectionMode="single"
				placeholder="Search and select options..."
				onSelectionChange={(items) => {
					setCurrentItems(items);
				}}
				selectedKeys={currentItems.map((item) => item.id)}
			>
				{dataMultipleWithSections.map((section) => (
					<Autocomplete.Section
						title={section.title}
						items={section.items}
						key={section.title}
					>
						{(item) => (
							<Autocomplete.Item
								key={item.id}
								textValue={item.textValue}
							>
								{item.textValue}
							</Autocomplete.Item>
						)}
					</Autocomplete.Section>
				))}
			</Autocomplete>
		</div>
	);
};

export const AutocompleteSingleError: Story = {
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

export const AutocompleteSingleDisabled: Story = {
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

export const AutocompleteSingleDisabledItems: Story = {
	render: () => (
		<div className="w-[200px]">
			<Autocomplete
				label="Select Single"
				selectionMode="single"
				placeholder="Select something"
				disabledKeys={["1"]}
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

export const AutocompleteMultipleStateless: Story = {
	render: () => (
		<div className="w-[300px]">
			<Autocomplete
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Search and select options..."
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

export const AutocompleteMultipleControllable = () => {
	const [currentItems, setCurrentItems] = useState([
		dataMultiple[0],
		dataMultiple[5],
	]);

	return (
		<div className="w-[300px]">
			<Autocomplete
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Select something"
				onSelectionChange={setCurrentItems}
				selectedKeys={currentItems.map((item) => item.id)}
				items={dataMultiple}
			>
				{(item) => (
					<Autocomplete.Item key={item.id} textValue={item.textValue}>
						{item.textValue}
					</Autocomplete.Item>
				)}
			</Autocomplete>
		</div>
	);
};

export const AutocompleteMultipleWithSections = () => {
	const [currentItems, setCurrentItems] = useState<
		{ id: string; textValue: string }[]
	>([dataMultipleWithSections[0].items[3]]);

	return (
		<div className="w-[300px]">
			<Autocomplete<ItemT>
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Select something"
				onSelectionChange={(items) => {
					setCurrentItems(items);
				}}
				selectedKeys={currentItems.map((item) => item.id)}
			>
				{dataMultipleWithSections.map((section: SectionT) => (
					<Autocomplete.Section
						title={section.title}
						items={section.items}
						key={section.title}
					>
						{(item) => (
							<Autocomplete.Item
								key={item.id}
								textValue={item.textValue}
							>
								{item.textValue}
							</Autocomplete.Item>
						)}
					</Autocomplete.Section>
				))}
			</Autocomplete>
		</div>
	);
};

export const AutocompleteMultipleControllableWithSelectedAndDisabledItems =
	() => {
		const [currentItems, setCurrentItems] = useState([
			dataMultiple[3],
			dataMultiple[5],
		]);

		return (
			<div className="w-[300px]">
				<Autocomplete
					label="Select Multiple"
					selectionMode="multiple"
					placeholder="Select something"
					onSelectionChange={setCurrentItems}
					selectedKeys={currentItems.map((item) => item.id)}
					disabledKeys={["4", "6"]}
					items={dataMultiple}
				>
					{(item) => (
						<Autocomplete.Item
							key={item.id}
							textValue={item.textValue}
						>
							{item.textValue}
						</Autocomplete.Item>
					)}
				</Autocomplete>
			</div>
		);
	};

export const AutocompleteMultipleError = () => {
	return (
		<div className="w-[300px]">
			<Autocomplete
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Select something"
				errorMessages={["Error message text"]}
				items={dataMultiple}
			>
				{(item) => (
					<Autocomplete.Item key={item.id} textValue={item.textValue}>
						{item.textValue}
					</Autocomplete.Item>
				)}
			</Autocomplete>
		</div>
	);
};

export const AutocompleteMultipleDisabled = () => {
	return (
		<div className="w-[300px]">
			<Autocomplete
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Select something"
				isDisabled
				items={dataMultiple}
			>
				{(item) => (
					<Autocomplete.Item key={item.id} textValue={item.textValue}>
						{item.textValue}
					</Autocomplete.Item>
				)}
			</Autocomplete>
		</div>
	);
};

export const AutocompleteMultipleDisabledWithKeys = () => {
	return (
		<div className="w-[300px]">
			<Autocomplete
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Select something"
				isDisabled
				selectedKeys={["3", "5"]}
				items={dataMultiple}
			>
				{(item) => (
					<Autocomplete.Item key={item.id} textValue={item.textValue}>
						{item.textValue}
					</Autocomplete.Item>
				)}
			</Autocomplete>
		</div>
	);
};
