import { test, describe, expect } from "vitest";
import { render, screen } from "@/test/utilities";
import { axe } from "jest-axe";
import { Menu } from "./component";
import { ButtonSquare } from "../button";
import { CardsIcon, PeopleIcon, SettingsIcon } from "../icon";

function renderMenu() {
	return render(
		<Menu>
			<ButtonSquare icon={SettingsIcon} />
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
		const { unmount } = renderMenu();

		expect(() => unmount()).not.toThrow();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderMenu();
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
