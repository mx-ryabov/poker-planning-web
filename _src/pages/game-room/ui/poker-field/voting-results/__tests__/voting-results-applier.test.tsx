/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi } from "vitest";
import { act, render, waitFor } from "@/test/utilities";
import { axe } from "jest-axe";
import { VotingResultsApplier } from "../components";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import {
	GameParticipant,
	GameVotingProcess,
	GameVotingStatus,
} from "@/_src/shared/api";
import { ConfirmationModalProvider } from "@/_src/shared/providers/confirmation-modal-provider";

describe("Voting Results Applier", () => {
	test("renders correctly", async () => {
		const { unmount } = renderComponent({});
		expect(() => unmount()).not.toThrow();
	});

	test("isn't shown if there is no ticket under vote", async () => {
		const { queryByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: null,
				startTime: new Date().toString(),
			},
		});

		expect(queryByText(/Select estimation/i)).not.toBeInTheDocument();
	});

	test("shows Select and Apply button if there is a ticket under vote", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({}),
				startTime: new Date().toString(),
			},
		});

		expect(getByText(/Select estimation/i)).toBeInTheDocument();
	});

	test("has Select Estimation placeholder if nobody voted", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({}),
				startTime: new Date().toString(),
			},
			participants: [
				generateParticipant({
					vote: null,
				}),
				generateParticipant({
					vote: null,
				}),
				generateParticipant({
					vote: null,
				}),
			],
		});

		getByText(/Select estimation/i);
	});

	test("has Apply button disabled if there is no estimation selected (i.e. nobody voted)", async () => {
		const { getByTestId } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({}),
				startTime: new Date().toString(),
			},
			participants: [
				generateParticipant({
					vote: null,
				}),
				generateParticipant({
					vote: null,
				}),
				generateParticipant({
					vote: null,
				}),
			],
		});

		const btn = getByTestId("apply-voting-results-btn");
		expect(btn).toBeDisabled();
	});

	test("has the most popular vote selected by default if at least one participant has voted", async () => {
		const { getByText } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({}),
				startTime: new Date().toString(),
			},
			participants: [
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[1],
				}),
			],
		});

		getByText(/suit 1 value 1/i);
	});

	test("opens confimation modal if an estimation is selected and Apply button is clicked", async () => {
		const { getByTestId, getByText, user } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({
					identifier: "test-ticket-identifier",
				}),
				startTime: new Date().toString(),
			},
			participants: [
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[1],
				}),
			],
		});

		const btn = getByTestId("apply-voting-results-btn");
		await user.click(btn);
		getByText(
			/The estimation value 1 will be applied for test-ticket-identifier and the voting process will be finished./i,
		);
	});

	test("invokes updateByField and finishVoting if Confirm button is clicked in the confirmation modal", async () => {
		const updateByField = vi.fn();
		const finishVoting = vi.fn();
		const { getByTestId, user } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({
					id: "test-ticket-id",
					identifier: "test-ticket-identifier",
				}),
				startTime: new Date().toString(),
			},
			participants: [
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[1],
				}),
			],
			updateByField,
			finishVoting,
		});

		const btn = getByTestId("apply-voting-results-btn");
		await user.click(btn);
		const confirmBtn = getByTestId("confirm-button");
		await user.click(confirmBtn);

		expect(updateByField).toHaveBeenNthCalledWith(
			1,
			"test-game-id",
			"test-ticket-id",
			expect.objectContaining({
				estimation: "value 1",
			}),
		);
	});

	test("shows error toast if updating finished with an error", async () => {
		const updateByField = vi.fn(async () => {
			throw new Error("test error");
		});
		const finishVoting = vi.fn();
    const { getByTestId, getByText, user } = renderComponent({
			votingProcess: {
				status: GameVotingStatus.Revealed,
				ticket: generateTicket({
					id: "test-ticket-id",
					identifier: "test-ticket-identifier",
				}),
				startTime: new Date().toString(),
			},
			participants: [
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[0],
				}),
				generateParticipant({
					vote: MOCKED_SYSTEM_VOTES[1],
				}),
			],
			updateByField,
			finishVoting,
		});

		const btn = getByTestId("apply-voting-results-btn");
		await user.click(btn);
		const confirmBtn = getByTestId("confirm-button");
		await user.click(confirmBtn);

		getByText(/test error/i);
	});

	test("shows error toast if voting finishing finished with an error", async () => {
		const updateByField = vi.fn();
		const finishVoting = vi.fn(async () => {
			throw new Error("test error");
		});
		const { getByTestId, getByText, user, debug, getByRole } =
			renderComponent({
				votingProcess: {
					status: GameVotingStatus.Revealed,
					ticket: generateTicket({
						id: "test-ticket-id",
						identifier: "test-ticket-identifier",
					}),
					startTime: new Date().toString(),
				},
				participants: [
					generateParticipant({
						vote: MOCKED_SYSTEM_VOTES[0],
					}),
					generateParticipant({
						vote: MOCKED_SYSTEM_VOTES[0],
					}),
					generateParticipant({
						vote: MOCKED_SYSTEM_VOTES[1],
					}),
				],
				updateByField,
				finishVoting,
			});

		const btn = getByTestId("apply-voting-results-btn");
		await user.click(btn);
		const confirmBtn = getByTestId("confirm-button");
		await user.click(confirmBtn);

		getByText(/Something went wrong.../i);
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderProps = {
	votingProcess?: GameVotingProcess;
	participants?: GameParticipant[];
	updateByField?: (field: string, value: any) => void;
	finishVoting?: () => Promise<void>;
};

function renderComponent({
	votingProcess = {
		status: GameVotingStatus.Revealed,
		ticket: generateTicket({}),
		startTime: new Date().toString(),
	},
	updateByField = vi.fn(),
	finishVoting = vi.fn(),
	participants = [],
}: RenderProps) {
	return render(
		<ConfirmationModalProvider>
			<VotingResultsApplier />
		</ConfirmationModalProvider>,
		{
			wrapper: GameRoomFakeProviderWrapper({
				apiProps: {
					game: {
						ticket: {
							updateTicketById: updateByField,
						},
					},
				},
				votingAsyncContextProps: {
					finishVoting,
				},
				gameStateProps: {
					game: generateGame({
						id: "test-game-id",
						votingProcess,
						participants,
						votingSystem: {
							id: "test-voting-system-id",
							name: "test-voting-system-name",
							creator: null,
							votes: MOCKED_SYSTEM_VOTES,
						},
					}),
					currentParticipant: generateParticipant({}),
				},
			}),
		},
	);
}

const MOCKED_SYSTEM_VOTES = [
	{
		id: "test-id",
		order: 0,
		suit: "suit 1",
		value: "value 1",
		votingSystemId: "test-voting-system-id",
	},
	{
		id: "test-id-1",
		order: 1,
		suit: "suit 2",
		value: "value 2",
		votingSystemId: "test-voting-system-id",
	},
];
