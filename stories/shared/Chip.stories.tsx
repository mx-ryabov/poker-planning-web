import { Chip, ChipGroup } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useListData } from "react-stately";

const meta = {
	title: "Shared/ChipGroup",
	component: ChipGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof ChipGroup>;

const initialItems = [
	{ id: 1, name: "Maxim" },
	{ id: 2, name: "Tanya" },
	{ id: 3, name: "Jack" },
	{ id: 4, name: "Jerry" },
];

export const ChipDefault: Story = {
	render: () => {
		let list = useListData({
			initialItems,
		});

		return (
			<ChipGroup
				items={list.items}
				aria-label="The list who can change the game's settings"
				onRemove={(keys) => list.remove(...keys)}
			>
				{(item) => <Chip textValue={item.name} key={item.id} />}
			</ChipGroup>
		);
	},
};

export const ChipStateless: Story = {
	render: () => {
		return (
			<ChipGroup aria-label="The list who can change the game's settings">
				<Chip textValue="Apple" />
				<Chip textValue="Orange" />
			</ChipGroup>
		);
	},
};

export const ChipOutlined: Story = {
	render: () => {
		let list = useListData({
			initialItems,
		});

		return (
			<ChipGroup
				items={list.items}
				outlined
				aria-label="The list who can change the game's settings"
				onRemove={(keys) => list.remove(...keys)}
			>
				{(item) => <Chip textValue={item.name} key={item.id} />}
			</ChipGroup>
		);
	},
};

export const ChipDisabled: Story = {
	render: () => {
		let list = useListData({
			initialItems,
		});

		return (
			<ChipGroup
				items={list.items}
				aria-label="The list who can change the game's settings"
				onRemove={(keys) => list.remove(...keys)}
			>
				{(item) => (
					<Chip isDisabled textValue={item.name} key={item.id} />
				)}
			</ChipGroup>
		);
	},
};

export const ChipOutlinedDisabled: Story = {
	render: () => {
		let list = useListData({
			initialItems,
		});

		return (
			<ChipGroup
				items={list.items}
				outlined
				aria-label="The list who can change the game's settings"
				onRemove={(keys) => list.remove(...keys)}
			>
				{(item) => (
					<Chip isDisabled textValue={item.name} key={item.id} />
				)}
			</ChipGroup>
		);
	},
};
