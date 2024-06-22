import { Select } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import {
	Button,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	SelectValue,
	Select as SelectAria,
} from "react-aria-components";

const meta = {
	title: "Shared/Select",
	component: Select,
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const data = [];

export const SelectSingle: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select label="Select Single" aria-label="Select Single">
				<Select.Section title="Title" aria-label="Section Title">
					<Select.Item key="1" textValue="Item 1" aria-label="Item 1">
						Item 1
					</Select.Item>
					<Select.Item
						isDisabled={true}
						key="2"
						textValue="Item 2"
						aria-label="Item 2"
					>
						Item 2
					</Select.Item>
				</Select.Section>
				<Select.Separator />
				<Select.Item key="3" textValue="Item 3" aria-label="Item 3">
					Item 3
				</Select.Item>
			</Select>
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

export const SelectMultiple: Story = {
	render: () => (
		<div className="w-full flex justify-center mt-[200px]">
			<div className="w-[300px]">
				<Select
					label="Select Multiple"
					selectionMode="multiple"
					aria-label="Select Multiple"
					items={dataMultiple}
				>
					{(item) => (
						<Select.Item
							key={item.id}
							aria-label={`Item ${item.textValue}`}
							textValue={item.textValue}
						>
							{item.textValue}
						</Select.Item>
					)}
				</Select>
			</div>
		</div>
	),
};

export const SelectError: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select
				label="Select Multiple"
				errorMessages={["Error 1", "Error 2"]}
				isInvalid
			>
				<Select.Item key="1">Item 1</Select.Item>
				<Select.Item key="2">Item 2</Select.Item>
				<Select.Item key="3">Item 3</Select.Item>
			</Select>
		</div>
	),
};

export const SelectDisabled: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select label="Select Multiple" isDisabled>
				<Select.Item key="1">Item 1</Select.Item>
				<Select.Item key="2">Item 2</Select.Item>
				<Select.Item key="3">Item 3</Select.Item>
			</Select>
		</div>
	),
};

export const SelectEmpty: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select label="Select Multiple">{[]}</Select>
		</div>
	),
};

export const SelectAriaDefault: Story = {
	render: () => (
		<div style={{ width: "200px" }}>
			<SelectAria isOpen={true}>
				<Label />
				<Button
					style={{
						border: "1px solid black",
						padding: "8px",
						backgroundColor: "yellow",
					}}
				>
					<SelectValue>
						{({ isPlaceholder, selectedText }) => (
							<div>
								{isPlaceholder ? (
									"Select an item"
								) : (
									<div style={{ height: "50px" }}>
										{selectedText}
									</div>
								)}
							</div>
						)}
					</SelectValue>
				</Button>
				<Popover
					style={{
						border: "1px solid black",
						padding: "8px",
						overflow: "auto",
					}}
					maxHeight={200}
				>
					<ListBox>
						<ListBoxItem>Apple</ListBoxItem>
						<ListBoxItem>Orange</ListBoxItem>
						<ListBoxItem>People</ListBoxItem>
						<ListBoxItem>Car</ListBoxItem>
						<ListBoxItem>Juce</ListBoxItem>
						<ListBoxItem>Pencil</ListBoxItem>
						<ListBoxItem>Laptop</ListBoxItem>
						<ListBoxItem>Headphones</ListBoxItem>
						<ListBoxItem>Table</ListBoxItem>
						<ListBoxItem>Cherry</ListBoxItem>
					</ListBox>
				</Popover>
			</SelectAria>
		</div>
	),
};
