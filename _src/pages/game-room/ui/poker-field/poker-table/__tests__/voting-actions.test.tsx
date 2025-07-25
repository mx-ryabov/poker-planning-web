import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { VotingActions } from "../components/voting-actions";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
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

	test("shows the button 'Start Voting' when voting process is inactive", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
				startTime: new Date().toString(),
			},
		});

		getByText("Start Voting");
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

	test("invokes startVoting with null when the button 'Start Voting' is clicked", async () => {
		const startVoting = vi.fn();
		const { getByText, user } = renderComponent({
			votingAsyncContextProps: {
				startVoting,
			},
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
			},
		});

		const btn = getByText("Start Voting");
		await user.click(btn);

		expect(startVoting).toHaveBeenNthCalledWith(1, null);
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
};

function renderComponent(props: RenderComponentProps = {}) {
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
				game: generateGame({
					votingProcess: {
						status: GameVotingStatus.Inactive,
						ticket: null,
						startTime: new Date().toString(),
						...props.votingProcess,
					},
				}),
				currentParticipant: generateParticipant({}),
			},
		}),
	});
}
