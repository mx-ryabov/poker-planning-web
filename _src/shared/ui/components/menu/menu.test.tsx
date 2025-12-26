import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { Menu } from "./component";
import { NewButton } from "../button";
import { CardsIcon, PeopleIcon, SettingsIcon } from "../icon";

function renderMenu() {
	return render(
		<Menu>
			<NewButton shape="square">
				<SettingsIcon size={18} />
			</NewButton>
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
		</Menu>,
	);
}

describe("Menu", () => {
	test("renders correctly", async () => {
		const { unmount, user, getByRole } = renderMenu();

		const trigger = getByRole("button");
		await user.click(trigger);

		expect(() => unmount()).not.toThrow();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderMenu();
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
