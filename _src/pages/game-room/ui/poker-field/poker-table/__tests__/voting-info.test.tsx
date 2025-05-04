import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { VotingInfo } from "../components/voting-info";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import { GameVotingProcess, GameVotingStatus } from "@/_src/shared/api";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";

describe("Voting Info", () => {
	test("renders correctly", async () => {
		const { unmount } = renderComponent({});
		expect(() => unmount()).not.toThrow();
	});

	test("shows the message 'Time to relax!' when voting process is inactive", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
			},
		});

		getByText("Time to relax!");
	});

	test("shows the message 'Regular Voting in progress' when voting process is in progress and ticket is null", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: null,
			},
		});

		getByText("Regular Voting in progress");
	});

	test("shows the message 'The ticket <ticket> under vote' when voting process is in progress and ticket is not null", async () => {
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

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderProps = {
	votingProcess?: GameVotingProcess;
};

function renderComponent({
	votingProcess = {
		status: GameVotingStatus.Inactive,
		ticket: null,
	},
}: RenderProps) {
	return render(<VotingInfo />, {
		wrapper: GameRoomFakeProviderWrapper({
			gameStateProps: {
				game: generateGame({
					votingProcess,
				}),
				currentParticipant: generateParticipant({}),
			},
		}),
	});
}
