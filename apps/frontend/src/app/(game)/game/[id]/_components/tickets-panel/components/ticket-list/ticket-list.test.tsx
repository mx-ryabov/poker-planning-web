import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { TicketList } from ".";
import { TicketListItem } from "../ticket-list-item";
import { TicketFilterContext } from "../tickets-filter/tickets-filter.provider";
import { TicketsFilterValue } from "../tickets-filter/types";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/__mocks__/game";
import { ParticipantRole, TicketType } from "@/src/domain/entities/game";
import {
	GameRoomFakeProviderWrapper,
	GameRoomFakeProviderWrapperProps,
} from "@/src/app/(game)/game/[id]/__mocks__";
import {
	TicketsSortingContext,
	TicketsSortingContextValue,
} from "../tickets-sorting/tickets-sorting.provider";

describe("Ticket List", () => {
	test("renders successfully", async () => {
		const { unmount, getAllByTestId } = renderComponent({
			hasTickets: true,
			role: ParticipantRole.Master,
		});

		const ticketItems = getAllByTestId(/ticket-list-item/i);

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

			expect(queryAllByTestId(/ticket-list-item/i)).toHaveLength(0);
			getByText(/No tickets in your game yet/i);
		});

		test.each([ParticipantRole.Master, ParticipantRole.VotingMember])(
			"shows a correct content for %s participant",
			async (role) => {
				const { queryAllByTestId, getByText } = renderComponent({
					hasTickets: false,
					role,
				});

				expect(queryAllByTestId(/ticket-list-item/i)).toHaveLength(0);
				getByText(/No tickets in your game yet/i);
				if (role === ParticipantRole.Master) {
					getByText(/Start creating them right now below/i);
				} else {
					getByText(/Your game master works hard to start gambling/i);
				}
			},
		);

		test("shows filtered empty state when filters hide all tickets", async () => {
			const { queryAllByTestId, getByText } = renderComponent({
				hasTickets: true,
				role: ParticipantRole.Master,
				filterValue: {
					textFilters: { text: "" },
					selectiveFilters: { type: TicketType.Bug },
				},
			});

			expect(queryAllByTestId(/ticket-list-item/i)).toHaveLength(0);
			getByText(/No tickets found for the selected filters/i);
			getByText(
				/Try different filters to find the tickets you're looking for/i,
			);
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

function renderComponent(
	props: {
		hasTickets: boolean;
		role: ParticipantRole;
		filterValue?: TicketsFilterValue;
	} & GameRoomFakeProviderWrapperProps,
) {
	const {
		hasTickets,
		role,
		filterValue = DEFAULT_FILTER_VALUE,
		...wrapperProps
	} = props;
	const ticketFilterContextValue = {
		filterValue,
		setSelectiveFilters: vi.fn(),
		resetSelectiveFilters: vi.fn(),
		setTextFilters: vi.fn(),
		resetTextFilters: vi.fn(),
		resetFilterValue: vi.fn(),
	};
	const ticketSortingContextValue: TicketsSortingContextValue = {
		sorting: "newest",
		setSorting: vi.fn(),
	};
	const GameWrapper = GameRoomFakeProviderWrapper({
		...wrapperProps,
		gameStateProps: {
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
		},
	});

	return render(
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
		</TicketList>,
		{
			wrapper: ({ children }) => (
				<GameWrapper>
					<TicketFilterContext.Provider
						value={ticketFilterContextValue}
					>
						<TicketsSortingContext.Provider
							value={ticketSortingContextValue}
						>
							{children}
						</TicketsSortingContext.Provider>
					</TicketFilterContext.Provider>
				</GameWrapper>
			),
		},
	);
}

const DEFAULT_FILTER_VALUE: TicketsFilterValue = {
	textFilters: {
		text: "",
	},
	selectiveFilters: {
		type: undefined,
		status: undefined,
	},
};
