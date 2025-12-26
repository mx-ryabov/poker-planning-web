import { Button } from "@/_src/shared/ui/components/button";
import {
	CardsIcon,
	PeopleIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import { Menu } from "@/_src/shared/ui/components/menu";
import type { Meta } from "@storybook/nextjs";

const meta = {
	title: "Shared/Menu",
	component: Menu.Content,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Menu.Content>;

export default meta;

export const MenuDefault = () => (
	<Menu>
		<Button shape="square">
			<SettingsIcon size={18} />
		</Button>
		<Menu.Content>
			<Menu.Section title="Dropdown Title">
				<Menu.Item id={1}>
					<PeopleIcon size={16} />
					List Item 1
				</Menu.Item>
				<Menu.Item id={2}>
					<SettingsIcon size={16} />
					List Item 2
				</Menu.Item>
				<Menu.Item id={3}>
					<CardsIcon size={16} />
					List Item 3
				</Menu.Item>
			</Menu.Section>
			<Menu.Separator />
			<Menu.Item id={4}>
				<PeopleIcon size={16} />
				List Item 4
			</Menu.Item>
			<Menu.Item key={5}>List Item 5</Menu.Item>
			<Menu.Item key={6}>List Item 6</Menu.Item>
		</Menu.Content>
	</Menu>
);
