import { test, describe, expect, vi, beforeEach } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { buildTicketItemWrapper, TicketItemWrapperProps } from "./utility";
import { TicketItemTile } from "../components/ticket-item-tile";
import { ComponentProps } from "react";
import { ParticipantRole, TicketType } from "@/_src/shared/api";
import { generateTicket } from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";

describe("TicketItemTile component", () => {
	beforeEach(() => {
		onTicketOpen.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount, getByText, getByTestId } = renderComponent({});

		expect(getByText("Test Ticket")).toBeInTheDocument();
		expect(getByText("TST-1")).toBeInTheDocument();
		expect(getByTestId("icon-TicketStoryIcon")).toBeInTheDocument();
		expect(() => unmount()).not.toThrow();
	});

	test("has the vote button when editable", async () => {
		const { getByTestId } = renderComponent({
			componentProps: { isEditable: true },
		});
		expect(getByTestId("vote-button")).toBeInTheDocument();
	});

	test("doesn't have the vote button when not editable", async () => {
		const { queryByTestId } = renderComponent({
			componentProps: { isEditable: false },
		});
		expect(queryByTestId("vote-button")).not.toBeInTheDocument();
	});

	test("triggers onOpen with the provided id on the container click", async () => {
		const { getByTestId, user } = renderComponent({});

		await user.click(getByTestId("ticket-list-item"));

		expect(onTicketOpen).toHaveBeenCalledTimes(1);
		expect(onTicketOpen).toHaveBeenCalledWith("test-id");
	});

	test("can have options", async () => {
		const { getByTestId } = renderComponent({});
		expect(getByTestId("ticket-list-item")).toBeInTheDocument();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

const openModalFn = vi.fn();
const onTicketOpen = vi.fn();
const deleteTicket = vi.fn();

type Props = {
	wrapperProps?: TicketItemWrapperProps;
	componentProps?: Partial<ComponentProps<typeof TicketItemTile>>;
};

function renderComponent(props: Props) {
	const {
		wrapperProps = { currentRole: ParticipantRole.Master, openModalFn },
		componentProps,
	} = props;
	return render(
		<TicketItemTile
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
			isEditable={componentProps?.isEditable || false}
			onOpen={onTicketOpen}
			deleteTicket={deleteTicket}
		/>,
		{
			wrapper: buildTicketItemWrapper(wrapperProps),
		},
	);
}
