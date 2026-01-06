import { useDomainApi } from "@/src/domain/providers";
import { useMutation } from "@/src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../_store";
import { useGlobalToast } from "@/src/shared/ui/components/toast";

export function useRevealCards() {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const revealCardsInStore = useGameState((state) => state.revealCards);

	const { mutate: revealCards, isPending } = useMutation({
		mutateFn: async () => api.game.revealCards(gameId),
		onSuccess: revealCardsInStore,
		onError: () => {
			toast?.add({
				title: "Revealing Cards failed.",
				variant: "error",
				description: "Please try again.",
			});
		},
	});

	return { revealCards, isPending };
}
