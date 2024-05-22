import { Select } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Shared/Select",
	component: Select,
	parameters: {
		//layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const data = [];

export const SelectSingle: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select
				label="Select Single"
				selectionMode="single"
				placeholder="Select something"
			>
				<Select.Item id="1" key="1" textValue="Item 1">
					Item 1
				</Select.Item>
				<Select.Item id="2" key="2" textValue="Item 2">
					Item 2
				</Select.Item>
				<Select.Item id="3" key="3" textValue="Item 3">
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
		<div className="w-[300px]">
			<Select
				label="Select Multiple"
				selectionMode="multiple"
				placeholder="Select something"
				items={dataMultiple}
			>
				{(item) => (
					<Select.Item
						id={item.id}
						key={item.id}
						textValue={item.textValue}
					>
						<span className="scale-100">{item.textValue}</span>
					</Select.Item>
				)}
			</Select>
		</div>
	),
};

export const SelectError: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select
				label="Select Multiple"
				placeholder="Select something"
				errorMessage="Error message"
			>
				<Select.Item id="1" key="1">
					Item 1
				</Select.Item>
				<Select.Item id="2" key="2">
					Item 2
				</Select.Item>
				<Select.Item id="3" key="3">
					Item 3
				</Select.Item>
			</Select>
		</div>
	),
};

export const SelectDisabled: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select
				label="Select Multiple"
				placeholder="Select something"
				defaultSelectedItems={[1]}
				disabled
			>
				<Select.Item id="1" key="1">
					Item 1
				</Select.Item>
				<Select.Item id="2" key="2">
					Item 2
				</Select.Item>
				<Select.Item id="3" key="3">
					Item 3
				</Select.Item>
			</Select>
		</div>
	),
};
