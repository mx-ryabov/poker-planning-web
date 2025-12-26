/**
 * @jest-environment jsdom
 */
import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { Popover } from "./component";
import { NewButton } from "../button";
import { CloseIcon } from "../icon";

describe("Popover", () => {
	test("renders correctly", async () => {
		const { unmount } = render(
			<Popover>
				<NewButton>Click</NewButton>
				<Popover.Content>Popover Content</Popover.Content>
			</Popover>,
		);

		expect(() => unmount()).not.toThrow();
	});

	test("opens and closes on overlay/trigger click", async () => {
		const { user, getByRole, queryByText, getByText, container } = render(
			<Popover>
				<NewButton role="trigger">Click</NewButton>
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
				<NewButton role="trigger">Click</NewButton>
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
				<NewButton role="trigger">Click</NewButton>
				<Popover.Content>
					<div>
						<p>Popover Content</p>
						<NewButton
							shape="square"
							size="small"
							slot="close"
							role="close-button"
						>
							<CloseIcon size={16} />
						</NewButton>
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
				<NewButton>Click</NewButton>
				<Popover.Content>Popover Content</Popover.Content>
			</Popover>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
