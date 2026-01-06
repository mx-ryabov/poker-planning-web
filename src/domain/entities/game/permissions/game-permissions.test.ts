import { describe, expect, test } from "vitest";
import { ParticipantRole } from "@/src/domain/entities/game";
import { checkGamePermission } from "./definitions";
import { GameActions } from "./actions";

describe("Game Permissions", () => {
	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: false },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"ChangeVoting: only Master is allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkGamePermission(GameActions.ChangeVoting, {
				actor: role,
			});
			expect(result).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: true },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"CreateTicket: Master and Manager are allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkGamePermission(GameActions.CreateTicket, {
				actor: role,
			});
			expect(result).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: true },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"EditTicket: Master and Manager are allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkGamePermission(GameActions.EditTicket, {
				actor: role,
			});
			expect(result).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: true },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"DeleteTicket: Master and Manager are allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkGamePermission(GameActions.DeleteTicket, {
				actor: role,
			});
			expect(result).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: false },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"ChangeGameSettings: only Master is allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkGamePermission(GameActions.ChangeGameSettings, {
				actor: role,
			});
			expect(result).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: false },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"FollowGameIntroOnboardingForMaster: only Master is allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkGamePermission(
				GameActions.FollowGameIntroOnboardingForMaster,
				{ actor: role },
			);
			expect(result).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: false },
		{ role: ParticipantRole.Manager, expectedResult: false },
		{ role: ParticipantRole.VotingMember, expectedResult: true },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"FollowGameIntroOnboardingForParticipant: only VotingMember is allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkGamePermission(
				GameActions.FollowGameIntroOnboardingForParticipant,
				{ actor: role },
			);
			expect(result).toBe(expectedResult);
		},
	);

	describe("KickParticipant", () => {
		test.each([
			{
				actor: ParticipantRole.Master,
				target: ParticipantRole.Manager,
				expected: true,
			},
			{
				actor: ParticipantRole.Master,
				target: ParticipantRole.VotingMember,
				expected: true,
			},
			{
				actor: ParticipantRole.Master,
				target: ParticipantRole.Spectator,
				expected: true,
			},
			{
				actor: ParticipantRole.Manager,
				target: ParticipantRole.VotingMember,
				expected: true,
			},
			{
				actor: ParticipantRole.Manager,
				target: ParticipantRole.Spectator,
				expected: true,
			},
			{
				actor: ParticipantRole.Manager,
				target: ParticipantRole.Master,
				expected: false,
			},
			{
				actor: ParticipantRole.Manager,
				target: ParticipantRole.Manager,
				expected: false,
			},
			{
				actor: ParticipantRole.VotingMember,
				target: ParticipantRole.Master,
				expected: false,
			},
			{
				actor: ParticipantRole.VotingMember,
				target: ParticipantRole.Manager,
				expected: false,
			},
			{
				actor: ParticipantRole.VotingMember,
				target: ParticipantRole.VotingMember,
				expected: false,
			},
			{
				actor: ParticipantRole.Spectator,
				target: ParticipantRole.Master,
				expected: false,
			},
			{
				actor: ParticipantRole.Spectator,
				target: ParticipantRole.Manager,
				expected: false,
			},
		])(
			"$actor can kick $target: $expected",
			({ actor, target, expected }) => {
				const result = checkGamePermission(
					GameActions.KickParticipant,
					{
						actor,
						target,
					},
				);
				expect(result).toBe(expected);
			},
		);

		test("returns false when target is missing", () => {
			const result = checkGamePermission(GameActions.KickParticipant, {
				actor: ParticipantRole.Master,
			});
			expect(result).toBe(false);
		});
	});
});
