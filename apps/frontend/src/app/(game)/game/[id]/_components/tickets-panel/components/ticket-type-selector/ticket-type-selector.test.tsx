import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { TicketType } from "@/src/domain/entities/game";
import {
	TicketTypeSelector,
	TicketTypeSelectorProps,
} from "./ticket-type-selector";

function renderComponent({
	value = TicketType.Story,
	onSelected = vi.fn(),
}: Partial<TicketTypeSelectorProps>) {
	return render(
		<TicketTypeSelector
			value={value}
			onSelected={onSelected}
			isEditable={true}
		/>,
	);
}

describe("Ticket Type Selector", () => {
	test("renders successfully", async () => {
		const { unmount, getByRole } = renderComponent({});

		within(getByRole("button")).getByTestId(/ticketstoryicon/i);
		expect(() => unmount()).not.throw();
	});

	test("has 3 ticket types", async () => {
		const { getByRole, user, getAllByRole } = renderComponent({});
		const trigger = getByRole("button");

		await user.click(trigger);
		const menuItems = getAllByRole("menuitemradio");

		expect(menuItems).toHaveLength(3);
		expect(menuItems.map((item) => item.textContent?.trim())).toEqual(
			expect.arrayContaining(["Story", "Bug", "Ticket"]),
		);
	});

	test("is fully controllable", async () => {
		const initialValue = TicketType.Bug;
		const onSelectedFn = vi.fn();
		const { getByRole, user, getAllByRole } = renderComponent({
			value: initialValue,
			onSelected: onSelectedFn,
		});

		const trigger = getByRole("button");
		within(trigger).getByTestId(/ticketbugicon/i);

		await user.click(trigger);
		const menuItems = getAllByRole("menuitemradio");
		await user.click(menuItems[0]);

		expect(onSelectedFn).toHaveBeenNthCalledWith(1, TicketType.Story);
	});
});
