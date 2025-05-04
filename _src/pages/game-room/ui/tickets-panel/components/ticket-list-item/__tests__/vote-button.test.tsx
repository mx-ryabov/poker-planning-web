import { test, describe, expect, vi, beforeEach } from "vitest";
import { act, render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { VoteButton } from "../components/vote-button";
import {
	GameTicket,
	GameVotingStatus,
	ParticipantRole,
} from "@/_src/shared/api";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import { createGameStateStore } from "@/_src/pages/game-room/model";

describe("Vote Button", () => {
	beforeEach(() => {
		startVoting.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount, getByTestId } = renderBtn({});
		const btn = getByTestId(/vote-button-test/i);

		expect(within(btn).queryByTestId("icon-CardsIcon")).toBeInTheDocument();
		expect(() => unmount()).not.toThrow();
	});

	test("renders button when voting status is inactive", async () => {
		const { gameStateStore, getByTestId } = renderBtn({});

		act(() =>
			gameStateStore.setState((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.Inactive;
				return state;
			}),
		);
		const btn = getByTestId(/vote-button-test/i);
		expect(btn).toBeInTheDocument();
	});

	test("invokes startVoting with ticket id when the button is clicked", async () => {
		const { gameStateStore, getByTestId, user } = renderBtn({
			ticket: generateTicket({ id: "test-ticket-id" }),
		});

		act(() =>
			gameStateStore.setState((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.Inactive;
				return state;
			}),
		);
		const btn = getByTestId(/vote-button-test/i);
		await user.click(btn);

		expect(startVoting).toHaveBeenNthCalledWith(1, "test-ticket-id");
	});

	test.each([GameVotingStatus.InProgress, GameVotingStatus.Revealed])(
		"shows Under Vote plate when the voting status is InProgress or Revealed AND ticketId === voting ticket id",
		async (votingStatus) => {
			const votingTicket = DEFAULT_TICKETS[0];
			const { gameStateStore, queryByTestId, getByText } = renderBtn({
				ticket: votingTicket,
			});
			act(() =>
				gameStateStore.setState((state) => {
					state.state.game.votingProcess.status = votingStatus;
					state.state.game.votingProcess.ticket = votingTicket;
					return state;
				}),
			);

			expect(
				queryByTestId(`vote-button-test-${votingTicket.id}`),
			).not.toBeInTheDocument();
			expect(getByText(/under vote/i)).toBeInTheDocument();
		},
	);

	test("shows nothing if another ticket is under vote", async () => {
		const votingTicket = DEFAULT_TICKETS[0];
		const { gameStateStore, queryByTestId, queryByText } = renderBtn({
			ticket: votingTicket,
		});
		act(() =>
			gameStateStore.setState((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.InProgress;
				state.state.game.votingProcess.ticket = DEFAULT_TICKETS[1];
				return state;
			}),
		);

		expect(
			queryByTestId(`vote-button-test-${votingTicket.id}`),
		).not.toBeInTheDocument();
		expect(queryByText(/under vote/i)).not.toBeInTheDocument();
	});

	test("shows nothing if no allowed for the current participant role", async () => {
		const votingTicket = DEFAULT_TICKETS[0];
		const { queryByTestId, queryByText } = renderBtn({
			ticket: votingTicket,
			currentParticipantRole: ParticipantRole.VotingMember,
		});

		expect(
			queryByTestId(`vote-button-test-${votingTicket.id}`),
		).not.toBeInTheDocument();
		expect(queryByText(/under vote/i)).not.toBeInTheDocument();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderBtn({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderProps = {
	ticket?: GameTicket;
	currentParticipantRole?: ParticipantRole;
	ticketsInList?: GameTicket[];
};

const startVoting = vi.fn();
const DEFAULT_TICKETS = [
	generateTicket({
		id: "ticket-id-1",
		title: "Ticket Name",
	}),
	generateTicket({
		id: "ticket-id-2",
		title: "Ticket Name 2",
	}),
];

function renderBtn({
	ticket = DEFAULT_TICKETS[0],
	currentParticipantRole = ParticipantRole.Master,
	ticketsInList = DEFAULT_TICKETS,
}: RenderProps) {
	const gameStateStore = createGameStateStore({
		game: generateGame({
			id: "test-game-id",
			tickets: ticketsInList,
		}),
		currentParticipant: generateParticipant({
			role: currentParticipantRole,
		}),
	});

	const returnedRender = render(<VoteButton ticket={ticket} />, {
		wrapper: GameRoomFakeProviderWrapper({
			votingAsyncContextProps: {
				startVoting,
			},
			gameStateStore,
		}),
	});
	return { gameStateStore, ...returnedRender };
}
