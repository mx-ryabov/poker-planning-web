import { selectCurrentVote, useGameState } from "@/_src/pages/game-room/model";
import { GameVote } from "@/_src/shared/api/game-api";
import { useMemo, useOptimistic } from "react";

export function useCardSelectionOptimistic() {
	const currentVote = useGameState(selectCurrentVote);
	const cardSelection: Set<string> = useMemo(
		() => (currentVote ? new Set([currentVote.id]) : new Set()),
		[currentVote],
	);
	const [selectedCard, selectOptimistic] = useOptimistic(
		cardSelection,
		(_, data: GameVote | null) => {
			return data ? new Set([data.id]) : new Set();
		},
	);

	return {
		selectedCard,
		selectOptimistic,
	};
}
