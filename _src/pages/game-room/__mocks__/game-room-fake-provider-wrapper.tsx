import {
	AppFakeProvider,
	AppFakeProviderProps,
} from "@/__mocks__/app-fake-provider";
import { ToastProvider } from "@/_src/shared/ui/components/toast";
import { ReactNode } from "react";
import {
	createGameStateStore,
	GameStateProvider,
	VotingContext,
	VotingState,
} from "../model";
import {
	generateGame,
	generateParticipant,
} from "../__tests__/game-state-store.test-helpers";
import { GameAsyncState } from "../model/store/game-async-state-slice/game-async-state.model";
import { vi } from "vitest";
import { GameStateCotnext } from "../model/store/game-state-context";
import { GameStateStore } from "../model/store/game-state-store.model";
import { StoreApi } from "zustand";

export type GameRoomFakeProviderWrapperProps = Omit<
	GameRoomFakeProviderProps,
	"children"
>;

export function GameRoomFakeProviderWrapper(
	props: GameRoomFakeProviderWrapperProps,
) {
	return ({ children }: { children: ReactNode }) => (
		<GameRoomFakeProvider {...props}>{children}</GameRoomFakeProvider>
	);
}

type GameRoomFakeProviderProps = {
	children: ReactNode;
	gameStateProps?: Partial<GameAsyncState>;
	gameStateStore?: StoreApi<GameStateStore>;
	votingAsyncContextProps?: Partial<VotingState>;
} & AppFakeProviderProps;

function GameRoomFakeProvider({
	children,
	gameStateProps,
	gameStateStore,
	votingAsyncContextProps,
	...appFakeProviderProps
}: GameRoomFakeProviderProps) {
	const gameStateStoreOverrided =
		gameStateStore ||
		createGameStateStore({
			...DEFAULT_GAME_STATE_PROPS,
			...gameStateProps,
		});
	return (
		<AppFakeProvider {...appFakeProviderProps}>
			<ToastProvider>
				<GameStateCotnext.Provider value={gameStateStoreOverrided}>
					<VotingContext.Provider
						value={{
							...DEFAULT_VOTING_CTX_PROPS,
							...votingAsyncContextProps,
						}}
					>
						{children}
					</VotingContext.Provider>
				</GameStateCotnext.Provider>
			</ToastProvider>
		</AppFakeProvider>
	);
}

const DEFAULT_VOTING_CTX_PROPS: VotingState = {
	startVoting: vi.fn(),
	revealCards: vi.fn(),
	finishVoting: vi.fn(),
	isStartVotingPending: false,
	isRevealCardsPending: false,
	isFinishVotingPending: false,
};

const DEFAULT_GAME_STATE_PROPS: GameAsyncState = {
	game: generateGame({ id: "test-game-id" }),
	currentParticipant: generateParticipant({
		id: "test-crrent-participant-id",
	}),
};
