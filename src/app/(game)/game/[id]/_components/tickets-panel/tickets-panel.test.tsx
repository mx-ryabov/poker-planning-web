/**
 * @jest-environment jsdom
 */
import "@/__mocks__/intersection-observer";
import { test, describe, expect, vi } from "vitest";
import { act, render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/__mocks__/game";
import {
	CreateTicketForGameRequest,
	ParticipantRole,
	TicketType,
} from "@/src/domain/entities/game";
import { TicketsPanel } from "./tickets-panel";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";

describe("Tickets Panel", () => {
	test("renders succsesfully", async () => {
		const { unmount, getAllByTestId, getByTestId, user } =
			renderComponent();
		const ticketItems = getAllByTestId(/ticket-list-item/i);
		const ticketCreatorOpener = getByTestId("ticket-creator-toggler");

		expect(ticketItems).toHaveLength(4);
		await user.click(ticketCreatorOpener);
		expect(() => unmount()).not.toThrow();
	});

	test("creates a ticket and adds it to the list", async () => {
		const { getAllByTestId, getByTestId, user } = renderComponent();
		const ticketCreatorOpener = getByTestId("ticket-creator-toggler");

		await user.click(ticketCreatorOpener);
		const ticketCreatorTextField = within(
			getByTestId("ticket-creator-form"),
		).getByRole("textbox");
		await user.type(ticketCreatorTextField, "New Ticket");

		expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(4);
		await user.keyboard("[Enter]");
		expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(5);
		expect(createTicket).toHaveBeenNthCalledWith(1, "test-game-id", {
			title: "New Ticket",
			type: TicketType.Story,
		});
	});

	test("expands/opens a ticket on click", async () => {
		const { getByTestId, user } = renderComponent();

		const ticketToOpen = getByTestId("ticket-list-item-ticket-id-1");
		await user.click(ticketToOpen);

		expect(
			getByTestId("ticket-list-item-full-view-ticket-id-1"),
		).toBeInTheDocument();
	});

	test("collapses/closes a ticket on collapse button click", async () => {
		const { getByTestId, queryByTestId, user } = renderComponent();

		const ticketToOpen = getByTestId("ticket-list-item-ticket-id-1");
		await user.click(ticketToOpen);

		const expandedTicket = getByTestId(
			"ticket-list-item-full-view-ticket-id-1",
		);
		const collapseBtn =
			within(expandedTicket).getByTestId("collapse-button");
		await act(() => user.click(collapseBtn));

		expect(getByTestId("ticket-list-item-ticket-id-1")).toBeInTheDocument();
		expect(
			queryByTestId("ticket-list-item-full-view-ticket-id-1"),
		).not.toBeInTheDocument();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

const createTicket = vi.fn(
	async (gameId: string, data: CreateTicketForGameRequest) => {
		return { ok: true, data: generateTicket({ ...data }) };
	},
);

function renderComponent() {
	return render(
		<>
			<>{TicketsPanel.body} </>
		</>,
		{
			wrapper: GameRoomFakeProviderWrapper({
				apiProps: {
					game: { ticket: { createTicket } },
				},
				gameStateProps: {
					game: generateGame({
						id: "test-game-id",
						tickets: [
							generateTicket({
								id: "ticket-id-1",
								title: "Ticket Name",
							}),
							generateTicket({
								id: "ticket-id-2",
								title: "Ticket Name 2",
							}),
							generateTicket({
								id: "ticket-id-3",
								title: "Ticket Name 3",
							}),
							generateTicket({
								id: "ticket-id-4",
								title: "Ticket Name 4",
							}),
						],
					}),
					currentParticipant: generateParticipant({
						role: ParticipantRole.Master,
					}),
				},
			}),
		},
	);
}
