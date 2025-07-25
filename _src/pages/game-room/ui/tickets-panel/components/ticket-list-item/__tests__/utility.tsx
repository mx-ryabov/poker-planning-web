import { FakeApi } from "@/__mocks__/api-fake-provider";
import { ConfirmationModalState } from "@/_src/shared/ui/components/modals";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	generateGame,
	generateParticipant,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import { GameVotingProcess, ParticipantRole } from "@/_src/shared/api/game-api";
import { vi } from "vitest";

export type TicketItemWrapperProps = {
	currentRole?: ParticipantRole;
	openModalFn?: (modalState: ConfirmationModalState) => void;
	apiFake?: FakeApi;
	votingProcess?: GameVotingProcess;
};
export function buildTicketItemWrapper({
	currentRole = ParticipantRole.Master,
	openModalFn = vi.fn(),
	apiFake,
	votingProcess,
}: TicketItemWrapperProps) {
	const generatedGame = generateGame({ id: "test-game-id" });
	return GameRoomFakeProviderWrapper({
		apiProps: apiFake,
		confirmationModalContextProps: { open: openModalFn },
		gameStateProps: {
			game: {
				...generatedGame,
				votingProcess: votingProcess || generatedGame.votingProcess,
			},
			currentParticipant: generateParticipant({
				role: currentRole,
			}),
		},
	});
}
