import { test, describe, expect } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import {
	GameVotingProcess,
	GameVotingStatus,
} from "@/_src/shared/api/game-api";
import { PokerField } from "./poker-field";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";
import {
	generateGame,
	generateParticipant,
} from "../../__tests__/game-state-store.test-helpers";

describe("Poker Field", () => {
	test("renders correctly", async () => {
		const { unmount, getByTestId } = renderComponent({});

		getByTestId("poker-table-container");
		expect(() => unmount()).not.toThrow();
	});

	test("doesn't show neither hole cards nor voting results if the voting status is Inactive", async () => {
		const { queryByTestId } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Inactive,
				ticket: null,
				startTime: new Date().toString(),
			},
		});

		expect(queryByTestId("hole-cards-container")).not.toBeInTheDocument();
		expect(
			queryByTestId("voting-results-container"),
		).not.toBeInTheDocument();
	});

	test("shows hole cards if the voting process is in progress", async () => {
		const { getByTestId, queryByTestId } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.InProgress,
				ticket: null,
				startTime: new Date().toString(),
			},
		});
		getByTestId("hole-cards-container");
		expect(
			queryByTestId("voting-results-container"),
		).not.toBeInTheDocument();
	});

	test("shows voting results if the voting status is Revealed", async () => {
		const { getByTestId, queryByTestId } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: null,
				startTime: new Date().toString(),
			},
		});
		getByTestId("voting-results-container");
		expect(queryByTestId("hole-cards-container")).not.toBeInTheDocument();
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
		startTime: new Date().toString(),
	},
}: RenderProps) {
	return render(<PokerField />, {
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
