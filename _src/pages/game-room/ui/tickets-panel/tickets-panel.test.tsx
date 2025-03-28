/**
 * @jest-environment jsdom
 */
import "@/__mocks__/intersection-observer";
import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { createGameStateStore } from "../../model";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "../../__tests__/game-state-store.test-helpers";
import {
	CreateTicketForGameRequest,
	ParticipantRole,
	TicketType,
} from "@/_src/shared/api";
import { TicketsPanel } from "./tickets-panel";
import { GameStateCotnext } from "../../model/store/game-state-context";
import { AppProvider } from "@/_src/app";
import { ApiFakeProvider } from "@/__mocks__/api-fake-provider";

const createTicket = vi.fn(
	async (gameId: string, data: CreateTicketForGameRequest) => {
		return generateTicket({ ...data });
	},
);

function renderComponent() {
	const gameStateStore = createGameStateStore({
		game: generateGame({
			id: "test-game-id",
			tickets: [
				generateTicket({ title: "Ticket Name" }),
				generateTicket({ title: "Ticket Name 2" }),
				generateTicket({ title: "Ticket Name 3" }),
				generateTicket({ title: "Ticket Name 4" }),
			],
		}),
		currentParticipant: generateParticipant({
			role: ParticipantRole.Master,
		}),
	});

	return render(
		<AppProvider>
			<ApiFakeProvider fakeApi={{ game: { ticket: { createTicket } } }}>
				<GameStateCotnext.Provider value={gameStateStore}>
					<TicketsPanel />
				</GameStateCotnext.Provider>
			</ApiFakeProvider>
		</AppProvider>,
	);
}

describe("Tickets Panel", () => {
	test("renders succsesfully", async () => {
		const { unmount, getAllByTestId, getByTestId, user } =
			renderComponent();
		const ticketItems = getAllByTestId("ticket-list-item");
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

		expect(getAllByTestId("ticket-list-item")).toHaveLength(4);
		await user.keyboard("[Enter]");
		expect(getAllByTestId("ticket-list-item")).toHaveLength(5);
		expect(createTicket).toHaveBeenNthCalledWith(1, "test-game-id", {
			title: "New Ticket",
			type: TicketType.Story,
		});
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
