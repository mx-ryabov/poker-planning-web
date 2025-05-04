import { useApi } from "@/_src/app";
import {
	selectCurrentGameId,
	selectVotingSystemVotes,
	useGameState,
} from "@/_src/pages/game-room/model";
import { GameVote } from "@/_src/shared/api/game-api";
import { VotingSystemVote } from "@/_src/shared/api/voting-system-api";
import { useMutation } from "@/_src/shared/lib";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";
import { useCallback } from "react";
import { useCardSelectionOptimistic } from "./use-card-selection-optimistic";
import { Selection } from "react-aria-components";

export type HoleCardsState = {
	cards: VotingSystemVote[];
	selectedCard: Set<string | number>;
	onSelectionChange: (value: Selection) => void;
};

export function useHoleCardsState(): HoleCardsState {
	const api = useApi();
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
			toast?.add({
				title: "Your attempt to vote failed.",
				description: "Please try again.",
				variant: "error",
			}),
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
