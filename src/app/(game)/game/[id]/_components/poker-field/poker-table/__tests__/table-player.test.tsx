import { test, describe, expect } from "vitest";
import { act, render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { createGameStateStore } from "@/src/app/(game)/game/[id]/_store";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { TablePlayer, TablePlayerProps } from "../components/table-player";
import { GameRoomFakeProviderWrapper } from "@/src/app/(game)/game/[id]/__mocks__";
import { GameVotingStatus } from "@/src/domain/entities/game";

describe("Table Player", () => {
	test("renders correctly", async () => {
		const { unmount } = renderPlayer({});
		expect(() => unmount()).not.toThrow();
	});

	test("shows the participant's name and initials if it's not a current participant", async () => {
		const renderedParticipant = generateParticipant({
			id: "rendered-p-id",
			displayName: "Test Participant",
		});
		const { getByText } = renderPlayer({
			participant: renderedParticipant,
			isCurrentPlayer: false,
		});

		getByText("TP");
		getByText("Test Participant");
	});

	test("shows the participant's name and 'You' if it's a current participant", async () => {
		const renderedParticipant = generateParticipant({
			id: "rendered-p-id",
			displayName: "Test Participant",
		});
		const { getByText, queryByText } = renderPlayer({
			participant: renderedParticipant,
			isCurrentPlayer: true,
		});

		getByText("You");
		getByText("Test Participant");
		expect(queryByText("TP")).not.toBeInTheDocument();
	});

	test("shows CardFaceDownSvg if voting process is InProgress and the participant has voted", async () => {
		const { gameStateStore, getByTestId } = renderPlayer({
			participant: generateParticipant({
				vote: {
					id: "test-id",
					order: 0,
					suit: "suit",
					value: "value",
				},
			}),
		});

		act(() =>
			gameStateStore.setState((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.InProgress;
				return state;
			}),
		);

		getByTestId("ready-status");
	});

	test("shows thinking dots if voting process is InProgress and the participant hasn't voted yet", async () => {
		const { gameStateStore, getByTestId } = renderPlayer({
			participant: generateParticipant({
				vote: null,
			}),
		});

		act(() =>
			gameStateStore.setState((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.InProgress;
				return state;
			}),
		);

		getByTestId("thinking-status");
	});

	test("shows the participant's vote if voting process is Revealed", async () => {
		const { gameStateStore, getByTestId } = renderPlayer({
			participant: generateParticipant({
				vote: {
					id: "test-id",
					order: 0,
					suit: "suit",
					value: "value",
				},
			}),
		});

		act(() =>
			gameStateStore.setState((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.Revealed;
				return state;
			}),
		);

		within(getByTestId("revealed-status")).getByText("value");
	});

	test("doesn't show any status bars if voting process is Inactive", async () => {
		const { gameStateStore, queryByTestId } = renderPlayer({});

		act(() =>
			gameStateStore.setState((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.Inactive;
				return state;
			}),
		);

		expect(queryByTestId("ready-status")).not.toBeInTheDocument();
		expect(queryByTestId("thinking-status")).not.toBeInTheDocument();
		expect(queryByTestId("revealed-status")).not.toBeInTheDocument();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderPlayer({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderProps = Partial<TablePlayerProps>;

function renderPlayer(props: RenderProps) {
	const {
		isCurrentPlayer = false,
		participant = generateParticipant({ id: "test-participants-id" }),
		tablePosition = "bottom",
	} = props;
	const gameStateStore = createGameStateStore({
		game: generateGame({
			id: "test-game-id",
		}),
		currentParticipant: generateParticipant({}),
	});

	const returnedRender = render(
		<TablePlayer
			isCurrentPlayer={isCurrentPlayer}
			participant={participant}
			tablePosition={tablePosition}
		/>,
		{
			wrapper: GameRoomFakeProviderWrapper({
				gameStateStore,
			}),
		},
	);

	return { gameStateStore, ...returnedRender };
}
