import { test, describe, expect, vi } from "vitest";
import { act, renderHook } from "@/test/utilities";
import { useVoteButton, UseVoteButtonProps } from "./use-vote-button";
import {
	generateGame,
	generateParticipant,
} from "../../../__tests__/game-state-store.test-helpers";
import { ReactNode } from "react";
import { GameStateProvider } from "../../../model";
import { ParticipantRole } from "@/_src/shared/api";
import { UseVoteButtonStateProps } from "../state/use-vote-button-state";
import { VotingStatus } from "../types";

describe("UseVotingButton hook", () => {
	test("renders correctly", async () => {
		const { unmount, result } = renderHook(
			() => useVoteButton(DEFAULT_STATE, DEFAULT_PROPS),
			{
				wrapper,
			},
		);

		expect(result.current).toMatchObject(
			expect.objectContaining({
				title: expect.any(String),
				isDisabled: expect.any(Boolean),
				contentLeft: expect.any(Object),
				onPress: expect.any(Function),
			}),
		);
		expect(() => unmount()).not.toThrow();
	});

	test.each<[string, VotingStatus]>([
		["Start Voting", "notStarted"],
		["Another In Progress", "anotherInProgress"],
		["Finish Voting", "currentInProgress"],
	])(
		"has title '%s' if votingStatus=%s",
		async (expectedTitle, votingStatus) => {
			const { result } = renderHook(
				() =>
					useVoteButton(
						{ ...DEFAULT_STATE, votingStatus },
						DEFAULT_PROPS,
					),
				{
					wrapper,
				},
			);

			expect(result.current.title).toBe(expectedTitle);
		},
	);

	test("disabled if votingStatus=anotherInProgress and isFinishingAlwaysAllowed=false", async () => {
		const { result } = renderHook(
			() =>
				useVoteButton(
					{ ...DEFAULT_STATE, votingStatus: "anotherInProgress" },
					{ ...DEFAULT_PROPS, isFinishingAlwaysAllowed: false },
				),
			{
				wrapper,
			},
		);

		expect(result.current.isDisabled).toBe(true);
	});

	test.each<[VotingStatus, boolean]>([
		["notStarted", false],
		["notStarted", true],
		["anotherInProgress", true],
		["currentInProgress", false],
		["currentInProgress", true],
	])(
		"enabled if votingStatus=%s and isFinishingAlwaysAllowed=%s",
		async (votingStatus, isFinishingAlwaysAllowed) => {
			const { result } = renderHook(
				() =>
					useVoteButton(
						{ ...DEFAULT_STATE, votingStatus },
						{ ...DEFAULT_PROPS, isFinishingAlwaysAllowed },
					),
				{
					wrapper,
				},
			);

			expect(result.current.isDisabled).toBe(false);
		},
	);

	test("triggers startVoting if votingStatus=notStarted and onPress is triggered", async () => {
		const startVoting = vi.fn();
		const { result } = renderHook(
			() =>
				useVoteButton(
					{
						...DEFAULT_STATE,
						votingStatus: "notStarted",
						startVoting,
					},
					{ ...DEFAULT_PROPS },
				),
			{
				wrapper,
			},
		);
		act(() => result.current.onPress(expect.anything()));

		expect(startVoting).toHaveBeenCalledOnce();
	});

	test("triggers finishVoting if votingStatus=currentInProgress and onPress is triggered", async () => {
		const finishVoting = vi.fn();
		const { result } = renderHook(
			() =>
				useVoteButton(
					{
						...DEFAULT_STATE,
						votingStatus: "currentInProgress",
						finishVoting,
					},
					{ ...DEFAULT_PROPS },
				),
			{
				wrapper,
			},
		);
		act(() => result.current.onPress(expect.anything()));

		expect(finishVoting).toHaveBeenCalledOnce();
	});

	test("triggers finishVoting if votingStatus=anotherInProgress, isFinishingAlwaysAllowed=true and onPress is triggered", async () => {
		const finishVoting = vi.fn();
		const { result } = renderHook(
			() =>
				useVoteButton(
					{
						...DEFAULT_STATE,
						votingStatus: "anotherInProgress",
						finishVoting,
					},
					{ ...DEFAULT_PROPS, isFinishingAlwaysAllowed: true },
				),
			{
				wrapper,
			},
		);
		act(() => result.current.onPress(expect.anything()));

		expect(finishVoting).toHaveBeenCalledOnce();
	});
});

const DEFAULT_PROPS: UseVoteButtonProps = {
	title: {
		notStarted: "Start Voting",
		anotherInProgress: "Another In Progress",
		currentInProgress: "Finish Voting",
	},
};

const DEFAULT_STATE: UseVoteButtonStateProps = {
	votingStatus: "notStarted",
	startVoting: vi.fn(),
	finishVoting: vi.fn(),
};

function wrapper({ children }: { children: ReactNode }) {
	return (
		<GameStateProvider
			initialAsyncState={{
				game: generateGame({ id: "test-game-id" }),
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			}}
		>
			{children}
		</GameStateProvider>
	);
}
