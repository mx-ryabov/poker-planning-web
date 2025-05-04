import { test, describe, expect, vi } from "vitest";
import { act, render, waitFor } from "@/test/utilities";
import { axe } from "jest-axe";
import { HoleCards } from "../hole-cards";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	generateGame,
	generateParticipant,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import { GameVote, ParticipantRole } from "@/_src/shared/api";

describe("Hole Cards", () => {
	test("renders correctly", async () => {
		const { unmount, getAllByTestId } = renderCards({});

		expect(getAllByTestId(/card-/i)).toHaveLength(3);
		expect(() => unmount()).not.toThrow();
	});

	test("calls voteApi when selected", async () => {
		const voteApi = vi.fn();
		const { getAllByTestId, user } = renderCards({ voteApi });

		const cards = getAllByTestId(/card-/i);
		await act(() => user.click(cards[0]));

		expect(voteApi).toHaveBeenNthCalledWith(1, "test-game-id", "vote-1");
	});
	test("calls voteApi when unselected", async () => {
		const voteApi = vi.fn();
		const { getAllByTestId, user } = renderCards({
			currentVote: MOCK_VOTES[0],
			voteApi,
		});

		const cards = getAllByTestId(/card-/i);
		await act(() => user.click(cards[0]));

		expect(voteApi).toHaveBeenNthCalledWith(1, "test-game-id", null);
	});

	test("apply selection changes immediatelly even if voteApi takes long", async () => {
		const voteApi = vi.fn(
			async () => new Promise((res) => setTimeout(() => res(true), 1000)),
		);
		const { getAllByTestId, user } = renderCards({
			voteApi,
		});

		const cards = getAllByTestId(/card-/i);
		await act(() => user.click(cards[0]));

		expect(voteApi).not.toHaveResolved();
		expect(cards[0]).toHaveAttribute("data-selected", "true");
	});

	test("unselect a card if voteApi returns an error", async () => {
		let reject: Function | undefined;
		const promise = new Promise((res, rej) => {
			reject = rej;
		});
		const voteApi = vi.fn(() => promise);
		const { getAllByTestId, user } = renderCards({
			voteApi,
		});

		const cards = getAllByTestId(/card-/i);
		await user.click(cards[0]);

		expect(voteApi).not.toHaveResolved();
		expect(cards[0]).toHaveAttribute("data-selected", "true");

		if (reject) {
			reject(new Error("test error"));
		}
		await waitFor(() => {
			expect(cards[0]).not.toHaveAttribute("data-selected", "true");
		});
	});

	test("shows a toast with error text if voteApi returns an error", async () => {
		let reject: Function | undefined;
		const promise = new Promise((res, rej) => {
			reject = rej;
		});
		const voteApi = vi.fn(() => promise);
		const { getAllByTestId, user, getByText } = renderCards({
			voteApi,
		});

		const cards = getAllByTestId(/card-/i);
		await user.click(cards[0]);

		expect(voteApi).not.toHaveResolved();
		expect(cards[0]).toHaveAttribute("data-selected", "true");

		if (reject) {
			reject(new Error("test error"));
		}
		await waitFor(() => {
			getByText(/Your attempt to vote failed./i);
		});
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderCards({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

const MOCK_VOTES = [
	{
		id: "vote-1",
		order: 0,
		value: "value-1",
		suit: "suit-1",
		votingSystemId: "test-voting-system-id",
	},
	{
		id: "vote-2",
		order: 1,
		value: "value-2",
		suit: "suit-2",
		votingSystemId: "test-voting-system-id",
	},
	{
		id: "vote-3",
		order: 2,
		value: "value-3",
		suit: "suit-3",
		votingSystemId: "test-voting-system-id",
	},
];

type RenderProps = {
	currentVote?: GameVote | null;
	voteApi?: () => void;
};
function renderCards({ currentVote = null, voteApi = vi.fn() }: RenderProps) {
	return render(<HoleCards />, {
		wrapper: GameRoomFakeProviderWrapper({
			apiProps: {
				game: {
					vote: voteApi,
				},
			},
			gameStateProps: {
				game: generateGame({
					id: "test-game-id",
					votingSystem: {
						id: "test-voting-system-id",
						name: "Voting System Test",
						creator: null,
						votes: MOCK_VOTES,
					},
				}),
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
					vote: currentVote,
				}),
			},
		}),
	});
}
