import { AutocompleteAria } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import type { Selection } from "react-aria-components";

const meta = {
	title: "Shared/AutocompleteAria",
	component: AutocompleteAria,
	parameters: {
		//layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AutocompleteAria>;

export default meta;
type Story = StoryObj<typeof AutocompleteAria>;

const data = [];

export const AutocompleteSingle: Story = {
	render: () => {
		let [selected, setSelected] = React.useState<Selection>();
		console.log("selected: ", selected);

		return (
			<div className="w-[200px]">
				<AutocompleteAria
					label="Select Single"
					selectedKeys={selected}
					onSelectionChange={setSelected}
				>
					<AutocompleteAria.Item id="1">Item 1</AutocompleteAria.Item>
					<AutocompleteAria.Item id="2">Item 2</AutocompleteAria.Item>
					<AutocompleteAria.Item id="3">Item 3</AutocompleteAria.Item>
				</AutocompleteAria>
			</div>
		);
	},
};
