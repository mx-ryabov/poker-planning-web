import {
	ArrowUpIcon,
	ButtonSquare,
	CardsIcon,
	CopySuccessIcon,
	Dropdown,
	PeopleIcon,
	SettingsIcon,
} from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Shared/Dropdown",
	component: Dropdown,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

const data = [
	{ icon: PeopleIcon, textValue: "List Item 1" },
	{ icon: SettingsIcon, textValue: "List Item 2" },
	{ icon: ArrowUpIcon, textValue: "List Item 3", disabled: true },
	{ icon: CardsIcon, textValue: "List Item 4" },
	{ icon: CopySuccessIcon, textValue: "List Item 5" },
];

export const DropdownDefault: Story = {
	render: () => (
		<Dropdown>
			<Dropdown.Trigger>
				<ButtonSquare icon={SettingsIcon} />
			</Dropdown.Trigger>
			<Dropdown.Menu onAction={(key) => console.log(key)}>
				<Dropdown.Menu.Section title="Dropdown Title" showDivider>
					<Dropdown.Menu.Item
						key={"List Item 1"}
						id={"List Item 1"}
						icon={PeopleIcon}
						textValue={"List Item 1"}
					/>
					<Dropdown.Menu.Item
						key={"List Item 2"}
						id={"List Item 2"}
						icon={SettingsIcon}
						textValue={"List Item 2"}
					/>
					<Dropdown.Menu.Item
						key={"List Item 3"}
						id={"List Item 3"}
						icon={CardsIcon}
						textValue={"List Item 2"}
						disabled={true}
					/>
				</Dropdown.Menu.Section>
				<Dropdown.Menu.Item
					key={"List Item 1"}
					id={"List Item 1"}
					icon={PeopleIcon}
					textValue={"List Item 1"}
				/>
				<Dropdown.Menu.Item
					key={"List Item 2"}
					id={"List Item 2"}
					icon={SettingsIcon}
					textValue={"List Item 2"}
				/>
				<Dropdown.Menu.Item
					key={"List Item 3"}
					id={"List Item 3"}
					icon={CardsIcon}
					textValue={"List Item 2"}
					disabled={true}
				/>
			</Dropdown.Menu>
		</Dropdown>
	),
};
