import { test, describe, expect, vi, beforeEach } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { ParticipantRole, TicketType } from "@/src/domain/entities/game";
import { ComponentProps } from "react";
import { generateTicket } from "@/__mocks__/game";
import { TicketListItem } from "../ticket-item";
import { buildTicketItemWrapper, TicketItemWrapperProps } from "./utility";

describe("TicketListItem component", () => {
	beforeEach(() => {
		onTicketOpen.mockClear();
		openModalFn.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount, getByTestId } = renderComponent({});

		// we don't check all the fields since the closed and opened states are tested separately
		expect(getByTestId(/ticket-list-item/i)).toBeInTheDocument();
		expect(() => unmount()).not.toThrow();
	});

	test("opens the ticket on click", async () => {
		const { getByTestId } = renderComponent({});

		getByTestId(/ticket-list-item/i).click();

		expect(onTicketOpen).toHaveBeenCalledTimes(1);
		expect(onTicketOpen).toHaveBeenCalledWith("test-id");
	});

	test("shows TicketItemFullView when opened", async () => {
		const { getByTestId } = renderComponent({
			componentProps: { isOpen: true },
		});
		expect(getByTestId(/ticket-list-item-full-view/i)).toBeInTheDocument();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

const openModalFn = vi.fn();
const onTicketOpen = vi.fn();

type Props = {
	wrapperProps?: TicketItemWrapperProps;
	componentProps?: Partial<ComponentProps<typeof TicketListItem>>;
};

function renderComponent(props: Props) {
	const {
		wrapperProps = { currentRole: ParticipantRole.Master, openModalFn },
		componentProps,
	} = props;
	return render(
		<TicketListItem
			data={
				componentProps?.data ||
				generateTicket({
					id: "test-id",
					title: "Test Ticket",
					description: "Test Description",
					type: TicketType.Story,
					identifier: "TST-1",
					estimation: "5",
				})
			}
			isOpen={componentProps?.isOpen || false}
			onOpen={onTicketOpen}
			onClose={() => {}}
		/>,
		{
			wrapper: buildTicketItemWrapper(wrapperProps),
		},
	);
}
