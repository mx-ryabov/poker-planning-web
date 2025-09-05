import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { VotingActions } from "../components/voting-actions";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	GameTicket,
	GameVotingProcess,
	GameVotingStatus,
} from "@/_src/shared/api/game-api";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import { VotingState } from "@/_src/pages/game-room/model";

describe("Voting Actions", () => {
	test("renders correctly", async () => {
		const { unmount } = renderComponent();
		expect(() => unmount()).not.toThrow();
	});

	test("suggests creating tickets if there is no tickets", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
			},
			tickets: [],
		});
		getByText(/Start from creating tickets/i);
		getByText(/Open Tickets Panel/i);
	});

	test("suggests voting for the first unestimated ticket if there are tickets and none is being voted on", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
			},
			tickets: [
				generateTicket({ id: "1", estimation: "3" }),
				generateTicket({ id: "2", estimation: null, identifier: "T2" }),
				generateTicket({ id: "3", estimation: null }),
				generateTicket({ id: "4", estimation: "5" }),
			],
		});
		getByText(/Select a ticket for voting or/i);
		getByText(/Vote for T2/i);
	});

	test("shows the message 'All tickets are estimated' if there are tickets and all are estimated", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
			},
			tickets: [
				generateTicket({ id: "1", estimation: "3" }),
				generateTicket({ id: "2", estimation: "5" }),
				generateTicket({ id: "3", estimation: "8" }),
				generateTicket({ id: "4", estimation: "5" }),
			],
		});

		getByText("Congratulations!");
		getByText(/All the tickets are estimated/i);
	});

	test("shows the button 'Reveal Cards' when voting process is in progress", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: null,
			},
		});

		getByText("Regular Voting in progress");
		getByText("Reveal Cards");
	});

	test("shows the button 'Cancel Voting' when voting process is in progress", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: null,
			},
		});

		getByText("Cancel Voting");
	});

	test("invokes cancelVoting when the button 'Cancel Voting' is clicked and votingProcess is InProgress", async () => {
		const cancelVoting = vi.fn();
		const { getByText, user } = renderComponent({
			votingAsyncContextProps: {
				cancelVoting,
			},
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: null,
			},
		});

		const btn = getByText("Cancel Voting");
		await user.click(btn);

		expect(cancelVoting).toHaveBeenCalledOnce();
	});

	test("shows the button 'Reveal Cards' when voting process is in progress and ticket is not null", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: generateTicket({
					identifier: "test-ticket-identifier",
				}),
			},
		});

		getByText("The ticket under vote");
		getByText("test-ticket-identifier");
	});

	test("invokes revealCards when the button 'Reveal Cards' in clicked and votingProcess is InProgress", async () => {
		const revealCards = vi.fn();
		const { getByText, user } = renderComponent({
			votingAsyncContextProps: {
				revealCards,
			},
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: null,
			},
		});

		const btn = getByText("Reveal Cards");
		await user.click(btn);

		expect(revealCards).toHaveBeenCalledOnce();
	});

	test("shows Finish Voting and Revote buttons when voting statis is Revealed", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: null,
			},
		});

		getByText("Finish Voting");
		getByText("Revote");
	});

	test("invokes finishVoting when the button 'Finish Voting' is clicked", async () => {
		const finishVoting = vi.fn();
		const { getByText, user } = renderComponent({
			votingAsyncContextProps: {
				finishVoting,
			},
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: null,
			},
		});

		const btn = getByText("Finish Voting");
		await user.click(btn);

		expect(finishVoting).toHaveBeenCalledOnce();
	});

	test("invokes startVoting with ticket id when the button 'Revote' is clicked", async () => {
		const startVoting = vi.fn();
		const { getByText, user } = renderComponent({
			votingAsyncContextProps: {
				startVoting,
			},
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({ id: "test-ticket-id" }),
			},
		});

		const btn = getByText("Revote");
		await user.click(btn);

		expect(startVoting).toHaveBeenNthCalledWith(1, "test-ticket-id");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent();
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderComponentProps = {
	votingProcess?: Partial<GameVotingProcess>;
	votingAsyncContextProps?: Partial<VotingState>;
	tickets?: GameTicket[];
};

function renderComponent(props: RenderComponentProps = {}) {
	const game = generateGame({
		votingProcess: {
			status: GameVotingStatus.Inactive,
			ticket: null,
			startTime: new Date().toString(),
			...props.votingProcess,
		},
	});
	if (props.tickets) {
		game.tickets = props.tickets;
	}
	return render(<VotingActions />, {
		wrapper: GameRoomFakeProviderWrapper({
			votingAsyncContextProps: {
				isStartVotingPending: false,
				startVoting: vi.fn(),
				isRevealCardsPending: false,
				revealCards: vi.fn(),
				isFinishVotingPending: false,
				finishVoting: vi.fn(),
				...props.votingAsyncContextProps,
			},
			gameStateProps: {
				game,
				currentParticipant: generateParticipant({}),
			},
		}),
	});
}
