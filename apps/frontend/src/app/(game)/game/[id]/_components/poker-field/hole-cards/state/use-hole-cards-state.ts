import { useDomainApi } from "@/src/domain/providers";
import {
	selectCurrentGameId,
	selectVotingSystemVotes,
	useGameState,
} from "@/src/app/(game)/game/[id]/_store";
import { GameVote } from "@/src/domain/entities/game";
import { VotingSystemVote } from "@/src/domain/entities/voting-system";
import { useMutation } from "@/src/shared/lib";
import { useGlobalToast } from "@/src/shared/ui/components/toast";
import { useCallback } from "react";
import { useCardSelectionOptimistic } from "./use-card-selection-optimistic";
import { Selection } from "react-aria-components";

export type HoleCardsState = {
	cards: VotingSystemVote[];
	selectedCard: Set<string | number>;
	onSelectionChange: (value: Selection) => void;
};

export function useHoleCardsState(): HoleCardsState {
	const api = useDomainApi();
	const toast = useGlobalToast();

	const gameId = useGameState(selectCurrentGameId);
	const votes = useGameState(selectVotingSystemVotes);
	const changeVote = useGameState((state) => state.changeVote);

	const { selectedCard, selectOptimistic } = useCardSelectionOptimistic();

	const { mutate: mutateVote } = useMutation({
		onMutate: selectOptimistic,
		mutateFn: async (vote: GameVote | null) => {
			await api.game.vote(gameId, vote?.id || null);
			return vote;
		},
		onSuccess: (vote) => changeVote(vote),
		onError: () =>
			toast?.add(
				{
					title: "Your attempt to vote failed.",
					description: "Please try again.",
					variant: "error",
				},
				{
					timeout: 5000,
				},
			),
	});

	const onSelectionChange = useCallback(
		(voteSelection: Selection) => {
			const voteId = Array.from(voteSelection)[0]?.toString() || null;
			const vote = votes.find((v) => v.id === voteId) || null;
			mutateVote(vote);
		},
		[votes, mutateVote],
	);

	return {
		cards: votes,
		selectedCard,
		onSelectionChange,
	};
}
