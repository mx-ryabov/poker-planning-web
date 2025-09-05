import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { VotingInfo } from "../components/voting-info";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	GameTicket,
	GameVotingProcess,
	GameVotingStatus,
} from "@/_src/shared/api";
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
				startTime: new Date().toString(),
			},
		});

		getByText("Time to relax!");
	});

	test("shows the message 'Regular Voting in progress' when voting process is in progress and ticket is null", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: null,
				startTime: new Date().toString(),
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
				startTime: new Date().toString(),
			},
		});

		getByText("The ticket under vote");
		getByText("test-ticket-identifier");
	});

	test("shows a massage that all the tickets are estimated if there are more than 0 tickets and all of them have estimation !== null", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
				startTime: new Date().toString(),
			},
			tickets: [
				generateTicket({ id: "1", estimation: "3" }),
				generateTicket({ id: "2", estimation: "5" }),
				generateTicket({ id: "3", estimation: "8" }),
			],
		});
		getByText(/Congratulations/i);
		getByText(/You're done. All the tickets are estimated/i);
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderProps = {
	votingProcess?: GameVotingProcess;
	tickets?: GameTicket[];
};

function renderComponent({
	votingProcess = {
		status: GameVotingStatus.Inactive,
		ticket: null,
		startTime: new Date().toString(),
	},
	tickets,
}: RenderProps) {
	const game = generateGame({
		votingProcess,
	});
	if (tickets) {
		game.tickets = tickets;
	}
	return render(<VotingInfo />, {
		wrapper: GameRoomFakeProviderWrapper({
			gameStateProps: {
				game,
				currentParticipant: generateParticipant({}),
			},
		}),
	});
}
