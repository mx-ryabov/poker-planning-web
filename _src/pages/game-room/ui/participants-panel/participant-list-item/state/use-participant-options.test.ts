import { test, describe, expect } from "vitest";
import { renderHook } from "@/test/utilities";
import { useParticipantMenuOptions } from "./use-participant-options";
import { ParticipantRole } from "@/_src/shared/api";
import {
	MANAGER_PARTICIPANT,
	MASTER_PARTICIPANT,
	SPECTATOR_PARTICIPANT,
	VOTING_MEMBER_PARTICIPANT,
} from "@/_src/shared/mocks/game";

describe("useParticipantMenuOptions", () => {
	describe("currentParticipantRole = Master", () => {
		test("returns empty options if participantFromList is Master", async () => {
			const { result } = renderHook(() =>
				useParticipantMenuOptions({
					currentParticipantRole: ParticipantRole.Master,
					participantFromList: MASTER_PARTICIPANT,
				}),
			);

			expect(result.current).toHaveLength(0);
		});

		test.each([
			[
				MANAGER_PARTICIPANT,
				VOTING_MEMBER_PARTICIPANT,
				SPECTATOR_PARTICIPANT,
			],
		])(
			"returns KickOption if participantFromList is Manager/VotingMember/Spectator",
			async (participantMock) => {
				const { result } = renderHook(() =>
					useParticipantMenuOptions({
						currentParticipantRole: ParticipantRole.Master,
						participantFromList: participantMock,
					}),
				);

				expect(result.current).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							title: "Kick",
						}),
					]),
				);
			},
		);
	});

	describe("currentParticipantRole = Manager", () => {
		test.each([[MASTER_PARTICIPANT, MANAGER_PARTICIPANT]])(
			"return empty options if participantFromList is Master/Manager",
			async (participantMock) => {
				const { result } = renderHook(() =>
					useParticipantMenuOptions({
						currentParticipantRole: ParticipantRole.Manager,
						participantFromList: participantMock,
					}),
				);

				expect(result.current).toHaveLength(0);
			},
		);

		test.each([[VOTING_MEMBER_PARTICIPANT, SPECTATOR_PARTICIPANT]])(
			"returns KickOption if participantFromList is VotingMember/Spectator",
			async (participantMock) => {
				const { result } = renderHook(() =>
					useParticipantMenuOptions({
						currentParticipantRole: ParticipantRole.Manager,
						participantFromList: participantMock,
					}),
				);

				expect(result.current).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							title: "Kick",
						}),
					]),
				);
			},
		);
	});

	describe("currentParticipantRole = VotingMemeber", () => {
		test.each([
			[
				MASTER_PARTICIPANT,
				MANAGER_PARTICIPANT,
				VOTING_MEMBER_PARTICIPANT,
				SPECTATOR_PARTICIPANT,
			],
		])(
			"returns empty options if participantFromList is Master/Manager/VotingMember/Spectator",
			async (participantMock) => {
				const { result } = renderHook(() =>
					useParticipantMenuOptions({
						currentParticipantRole: ParticipantRole.VotingMember,
						participantFromList: participantMock,
					}),
				);

				expect(result.current).toHaveLength(0);
			},
		);
	});

	describe("currentParticipantRole = Spectator", () => {
		test.each([
			[
				MASTER_PARTICIPANT,
				MANAGER_PARTICIPANT,
				VOTING_MEMBER_PARTICIPANT,
				SPECTATOR_PARTICIPANT,
			],
		])(
			"returns empty options if participantFromList is Master/Manager/VotingMember/Spectator",
			async (participantMock) => {
				const { result } = renderHook(() =>
					useParticipantMenuOptions({
						currentParticipantRole: ParticipantRole.Spectator,
						participantFromList: participantMock,
					}),
				);

				expect(result.current).toHaveLength(0);
			},
		);
	});
});
