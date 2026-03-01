import { test, describe, expect, vi, beforeEach } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { buildTicketItemWrapper, TicketItemWrapperProps } from "./utility";
import { TicketItemTile } from "../components/ticket-item-tile";
import { ComponentProps } from "react";
import {
	GameTicket,
	ParticipantRole,
	TicketType,
} from "@/src/domain/entities/game";
import { generateTicket } from "@/__mocks__/game";

describe("TicketItemTile component", () => {
	beforeEach(() => {
		onTicketOpen.mockClear();
		updateTicketById.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount, getByText, getByTestId } = renderComponent({});

		expect(getByText("Test Ticket")).toBeInTheDocument();
		expect(getByText("TST-1")).toBeInTheDocument();
		expect(getByTestId("icon-TicketStoryIcon")).toBeInTheDocument();
		expect(getByTestId("ticket-estimation-read-view")).toBeInTheDocument();
		expect(() => unmount()).not.toThrow();
	});

	test("has the vote button when editable", async () => {
		const { getByTestId } = renderComponent({
			componentProps: { isEditable: true },
		});
		expect(getByTestId(/vote-button-test/i)).toBeInTheDocument();
	});

	test("doesn't have the vote button when not editable", async () => {
		const { queryByTestId } = renderComponent({
			componentProps: { isEditable: false },
		});
		expect(queryByTestId("vote-button")).not.toBeInTheDocument();
	});

	test("doesn't allow to change estimation when isEditable=false", async () => {
		const { getByTestId } = renderComponent({
			componentProps: { isEditable: false },
		});
		const estimation = getByTestId("ticket-estimation-read-view");
		expect(estimation).toBeDisabled();
	});

	test("triggers onOpen with the provided id on the container click", async () => {
		const { getByTestId, user } = renderComponent({});

		await user.click(getByTestId(/ticket-list-item/i));

		expect(onTicketOpen).toHaveBeenCalledTimes(1);
		expect(onTicketOpen).toHaveBeenCalledWith("test-ticket-id");
	});

	test("triggers updateTicketById with correct parameters when estimation edited", async () => {
		const { getByTestId, user } = renderComponent({
			componentProps: { isEditable: true },
		});
		const estimation = getByTestId("ticket-estimation-read-view");
		await user.click(estimation);
		const inputElement = getByTestId("ticket-estimation-editor");
		await user.clear(inputElement);
		await user.type(inputElement, "2");
		const confirmBtn = getByTestId("ticket-estimation-confirm-button");
		await user.click(confirmBtn);
		expect(updateTicketById).toHaveBeenNthCalledWith(
			1,
			"test-game-id",
			"test-ticket-id",
			expect.objectContaining({
				estimation: "2",
			}),
		);
	});

	test("can have options", async () => {
		const { getByTestId } = renderComponent({});
		expect(getByTestId(/ticket-list-item/i)).toBeInTheDocument();
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
const updateTicketById = vi.fn(
	async (gameId: string, ticketId: string, data: GameTicket) => {
		return { ...data, id: ticketId, gameId };
	},
);

type Props = {
	wrapperProps?: TicketItemWrapperProps;
	componentProps?: Partial<ComponentProps<typeof TicketItemTile>>;
};

function renderComponent(props: Props) {
	const {
		wrapperProps = {
			currentRole: ParticipantRole.Master,
			openModalFn,
			apiFake: {
				game: {
					ticket: { updateTicketById },
				},
			},
		},
		componentProps,
	} = props;
	return render(
		<TicketItemTile
			data={
				componentProps?.data ||
				generateTicket({
					id: "test-ticket-id",
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
