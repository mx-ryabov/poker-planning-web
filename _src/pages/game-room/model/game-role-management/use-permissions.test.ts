import { test, describe, expect } from "vitest";
import { renderHook } from "@/test/utilities";
import { usePermissions } from "./use-permissions";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";
import { ParticipantRole } from "@/_src/shared/api";
import { generateParticipant } from "../../__tests__/game-state-store.test-helpers";
import { RestrictedGameActionsType } from "./permissions-checker/restricted-game-actions";

describe("usePermissions", () => {
	test("renders correctly", async () => {
		const { unmount } = renderUsePermissions(
			"ChangeVoting",
			ParticipantRole.Master,
		);
		expect(() => unmount()).not.toThrow();
	});

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: false },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"ChangeVoting is allowed only for Master role",
		async ({ role, expectedResult }) => {
			const { result } = renderUsePermissions("ChangeVoting", role);

			expect(result.current).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: true },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"CreateTicket is allowed only for Master and Manager roles",
		async ({ role, expectedResult }) => {
			const { result } = renderUsePermissions("CreateTicket", role);

			expect(result.current).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: true },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"EditTicket is allowed only for Master and Manager roles",
		async ({ role, expectedResult }) => {
			const { result } = renderUsePermissions("EditTicket", role);

			expect(result.current).toBe(expectedResult);
		},
	);

	test.each([
		{ role: ParticipantRole.Master, expectedResult: true },
		{ role: ParticipantRole.Manager, expectedResult: true },
		{ role: ParticipantRole.VotingMember, expectedResult: false },
		{ role: ParticipantRole.Spectator, expectedResult: false },
	])(
		"DeleteTicket is allowed only for Master and Manager roles",
		async ({ role, expectedResult }) => {
			const { result } = renderUsePermissions("DeleteTicket", role);

			expect(result.current).toBe(expectedResult);
		},
	);
});

function renderUsePermissions(
	action: RestrictedGameActionsType,
	currentUserRole: ParticipantRole,
) {
	return renderHook(() => usePermissions(action), {
		wrapper: GameRoomFakeProviderWrapper({
			gameStateProps: {
				currentParticipant: generateParticipant({
					role: currentUserRole,
				}),
			},
		}),
	});
}
