import { Select } from "@/src/shared/ui/components/select";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
	title: "Shared/Select",
	component: Select,
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

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

export const SelectMultipleWithDisabledKeys: Story = {
	render: () => (
		<div className="w-full flex justify-center mt-[200px]">
			<div className="w-[300px]">
				<Select
					label="Select Multiple"
					selectionMode="multiple"
					aria-label="Select Multiple"
					disabledKeys={["1", "3"]}
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

export const SelectMultipleWithDisabledAndSelectedKeys: Story = {
	render: () => (
		<div className="w-full flex justify-center mt-[200px]">
			<div className="w-[300px]">
				<Select
					label="Select Multiple"
					selectionMode="multiple"
					aria-label="Select Multiple"
					disabledKeys={["1", "3"]}
					defaultSelectedKeys={["1", "3"]}
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

export const SelectDisabledWithSelectedItem: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select label="Select Multiple" isDisabled selectedKeys={["2"]}>
				<Select.Item key="1">Item 1</Select.Item>
				<Select.Item key="2">Item 2</Select.Item>
				<Select.Item key="3">Item 3</Select.Item>
			</Select>
		</div>
	),
};

export const SelectMultipleDisabled: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select
				label="Select Multiple"
				selectionMode="multiple"
				aria-label="Select Multiple"
				items={dataMultiple}
				isDisabled
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
	),
};

export const SelectMultipleDisabledWithSelectedItems: Story = {
	render: () => (
		<div className="w-[300px]">
			<Select
				label="Select Multiple"
				selectionMode="multiple"
				aria-label="Select Multiple"
				items={dataMultiple}
				isDisabled
				defaultSelectedKeys={["1", "2"]}
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
	),
};

export const SelectEmpty: Story = {
	render: () => (
		<div className="w-[200px]">
			<Select label="Select Multiple">{[]}</Select>
		</div>
	),
};
