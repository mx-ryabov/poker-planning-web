import { useApi } from "@/_src/shared/providers";
import { useMutation } from "@/_src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../store";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

export function useRevealCards() {
	const api = useApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const revealCardsInStore = useGameState((state) => state.revealCards);

	const { mutate: revealCards, isPending } = useMutation({
		mutateFn: async () => {
			const res = await api.game.revealCards(gameId);
			if (!res.ok) throw res.error;
			return res.data;
		},
		onSuccess: revealCardsInStore,
		onError: (e) => {
			toast?.add({
				title: "Revealing Cards failed.",
				variant: "error",
				description: "Please try again.",
			});
		},
	});

	return { revealCards, isPending };
}
