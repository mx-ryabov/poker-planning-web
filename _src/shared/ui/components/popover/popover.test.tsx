/**
 * @jest-environment jsdom
 */
import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { Popover } from "./component";
import { Button, ButtonSquare } from "../button";
import { CloseIcon } from "../icon";

describe("Popover", () => {
	test("renders correctly", async () => {
		const { unmount } = render(
			<Popover>
				<Button title="Click" />
				<Popover.Content>Popover Content</Popover.Content>
			</Popover>,
		);

		expect(() => unmount()).not.toThrow();
	});

	test("opens and closes on overlay/trigger click", async () => {
		const { user, getByRole, queryByText, getByText, container } = render(
			<Popover>
				<Button title="Click" role="trigger" />
				<Popover.Content>Popover Content</Popover.Content>
			</Popover>,
		);

		const trigger = getByRole("trigger");
		expect(queryByText("Popover Content")).toBeNull();

		// open
		await user.click(trigger);
		getByText("Popover Content");

		// close by click on the trigger
		await user.click(trigger);
		expect(queryByText("Popover Content")).toBeNull();

		// open
		await user.click(trigger);

		// close on overlay click
		await user.click(container);
		expect(queryByText("Popover Content")).toBeNull();
	});

	test("doesn't close on content click", async () => {
		const { user, getByRole, queryByText, getByText } = render(
			<Popover>
				<Button title="Click" role="trigger" />
				<Popover.Content>Popover Content</Popover.Content>
			</Popover>,
		);

		const trigger = getByRole("trigger");
		await user.click(trigger);
		const popoverContent = getByText("Popover Content");
		await user.click(popoverContent);

		expect(queryByText("Popover Content")).not.toBeNull();
	});

	test("closes on button with slot=close", async () => {
		const { user, getByRole, queryByText } = render(
			<Popover>
				<Button title="Click" role="trigger" />
				<Popover.Content>
					<div>
						<p>Popover Content</p>
						<ButtonSquare
							size="small"
							icon={CloseIcon}
							slot="close"
							role="close-button"
						/>
					</div>
					Popover Content
				</Popover.Content>
			</Popover>,
		);
		const trigger = getByRole("trigger");
		await user.click(trigger);
		const closeButton = getByRole("close-button");
		await user.click(closeButton);

		expect(queryByText("Popover Content")).toBeNull();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(
			<Popover>
				<Button title="Click" />
				<Popover.Content>Popover Content</Popover.Content>
			</Popover>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
