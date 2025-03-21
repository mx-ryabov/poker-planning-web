import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { TicketList } from "../ticket-list";
import { TicketListItem } from "../ticket-list-item";
import {
	createGameStateStore,
	GameStateProvider,
} from "@/_src/pages/game-room/model";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import { ParticipantRole } from "@/_src/shared/api";
import { GameStateCotnext } from "../../../model/store/game-state-context";
import { AppProvider } from "@/_src/app";

function renderComponent(props: {
	hasTickets: boolean;
	role: ParticipantRole;
}) {
	const { hasTickets, role } = props;
	const gameStateStore = createGameStateStore({
		game: generateGame({
			tickets: hasTickets
				? [
						generateTicket({ title: "Ticket Name" }),
						generateTicket({ title: "Ticket Name 2" }),
						generateTicket({ title: "Ticket Name 3" }),
						generateTicket({ title: "Ticket Name 4" }),
					]
				: [],
		}),
		currentParticipant: generateParticipant({ role }),
	});

	return render(
		<AppProvider>
			<GameStateCotnext.Provider value={gameStateStore}>
				<TicketList>
					{(ticketItemData) => (
						<TicketListItem
							key={ticketItemData.id}
							isOpen={false}
							onOpen={vi.fn()}
							data={ticketItemData}
							onClose={vi.fn()}
						/>
					)}
				</TicketList>
			</GameStateCotnext.Provider>
		</AppProvider>,
	);
}

describe("Ticket List", () => {
	test("renders successfully", async () => {
		const { unmount, getAllByTestId } = renderComponent({
			hasTickets: true,
			role: ParticipantRole.Master,
		});

		const ticketItems = getAllByTestId("ticket-list-item");

		expect(ticketItems).toHaveLength(4);
		expect(ticketItems[1]).toHaveTextContent(/ticket name 2/i);
		expect(ticketItems[3]).toHaveTextContent(/ticket name 4/i);
		expect(() => unmount()).not.toThrow();
	});

	describe("Empty State", () => {
		test("shows an empty state when tickets.length === 0", async () => {
			const { queryAllByTestId, getByText } = renderComponent({
				hasTickets: false,
				role: ParticipantRole.Master,
			});

			expect(queryAllByTestId("ticket-list-item")).toHaveLength(0);
			getByText(/No issues in your game yet/i);
		});

		test("shows a correct content for Master/Manager participant", async () => {
			const { queryAllByTestId, getByText } = renderComponent({
				hasTickets: false,
				role: ParticipantRole.Master,
			});

			expect(queryAllByTestId("ticket-list-item")).toHaveLength(0);
			getByText(/Start creating them right now below/i);
		});

		test("shows a correct content for usual participants", async () => {
			const { queryAllByTestId, getByText } = renderComponent({
				hasTickets: false,
				role: ParticipantRole.VotingMember,
			});

			expect(queryAllByTestId("ticket-list-item")).toHaveLength(0);
			getByText(/Your game master works hard to start gambling/i);
		});
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({
			hasTickets: false,
			role: ParticipantRole.Master,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
