import { FakeApi } from "@/__mocks__/api-fake-provider";
import { ConfirmationModalState } from "@/src/shared/ui/components/modals";
import { GameRoomFakeProviderWrapper } from "@/src/app/(game)/game/[id]/__mocks__";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { GameVotingProcess, ParticipantRole } from "@/src/domain/entities/game";
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
