import { FakeApi } from "@/__mocks__/api-fake-provider";
import { ConfirmationModalState } from "@/_src/shared/ui/components/modals";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	generateGame,
	generateParticipant,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import { ParticipantRole } from "@/_src/shared/api/game-api";
import { vi } from "vitest";

export type TicketItemWrapperProps = {
	currentRole?: ParticipantRole;
	openModalFn?: (modalState: ConfirmationModalState) => void;
	apiFake?: FakeApi;
};
export function buildTicketItemWrapper({
	currentRole = ParticipantRole.Master,
	openModalFn = vi.fn(),
	apiFake,
}: TicketItemWrapperProps) {
	return GameRoomFakeProviderWrapper({
		apiProps: apiFake,
		confirmationModalContextProps: { open: openModalFn },
		gameStateProps: {
			game: generateGame({ id: "test-game-id" }),
			currentParticipant: generateParticipant({
				role: currentRole,
			}),
		},
	});
}
