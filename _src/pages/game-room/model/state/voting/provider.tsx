"use client";
import { createContext, ReactNode, useContext } from "react";
import { useStartVoting } from "./use-start-voting";
import { useRevealCards } from "./use-reveal-cards";
import { useFinishVoting } from "./use-finish-voting";
import { useCancelVoting } from "./use-cancel-voting";
export interface VotingState {
	startVoting: (ticketId: string | null) => Promise<void>;
	revealCards: () => Promise<void>;
	cancelVoting: () => Promise<void>;
	finishVoting: () => Promise<void>;
	isStartVotingPending: boolean;
	isRevealCardsPending: boolean;
	isCancelVotingPending: boolean;
	isFinishVotingPending: boolean;
}

export const VotingContext = createContext<VotingState | null>(null);

type VotingProviderProps = {
	children: ReactNode;
};

export function VotingAsyncStateProvider({ children }: VotingProviderProps) {
	const { startVoting, isPending: isStartVotingPending } = useStartVoting();
	const { cancelVoting, isPending: isCancelVotingPending } =
		useCancelVoting();
	const { revealCards, isPending: isRevealCardsPending } = useRevealCards();
	const { finishVoting, isPending: isFinishVotingPending } =
		useFinishVoting();

	return (
		<VotingContext.Provider
			value={{
				startVoting,
				revealCards,
				cancelVoting,
				finishVoting,
				isStartVotingPending,
				isCancelVotingPending,
				isRevealCardsPending,
				isFinishVotingPending,
			}}
		>
			{children}
		</VotingContext.Provider>
	);
}

export function useVotingAsyncState() {
	const value = useContext(VotingContext);
	if (!value) {
		throw new Error(
			"useVotingAsyncState is have to be used within VotingAsyncStateProvider",
		);
	}

	return value;
}
