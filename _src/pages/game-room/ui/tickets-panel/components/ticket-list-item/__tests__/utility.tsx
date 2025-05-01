import { ApiFakeProvider, FakeApi } from "@/__mocks__/api-fake-provider";
import { ConfirmationModalContext } from "@/_src/app";
import { ConfirmationModalState } from "@/_src/app/modals";
import {
	generateGame,
	generateParticipant,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import {
	GameStateProvider,
	VotingAsyncStateProvider,
} from "@/_src/pages/game-room/model";
import { ParticipantRole } from "@/_src/shared/api/game-api";
import { ReactNode } from "react";
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
	return ({ children }: { children: ReactNode }) => {
		return (
			<ApiFakeProvider fakeApi={apiFake}>
				<ConfirmationModalContext.Provider
					value={{ open: openModalFn }}
				>
					<GameStateProvider
						initialAsyncState={{
							game: generateGame({ id: "test-game-id" }),
							currentParticipant: generateParticipant({
								role: currentRole,
							}),
						}}
					>
						<VotingAsyncStateProvider>
							{children}
						</VotingAsyncStateProvider>
					</GameStateProvider>
				</ConfirmationModalContext.Provider>
			</ApiFakeProvider>
		);
	};
}
