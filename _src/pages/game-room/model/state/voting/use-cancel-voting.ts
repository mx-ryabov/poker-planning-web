import { useApi } from "@/_src/shared/providers";
import { useMutation } from "@/_src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../store";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

export function useCancelVoting() {
	const api = useApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const cancelVotingInStore = useGameState((state) => state.cancelVoting);

	const { mutate: cancelVoting, isPending } = useMutation({
		mutateFn: async () => {
			const res = await api.game.cancelVoting(gameId);
			if (!res.ok) throw res.error;
			return res.data;
		},
		onSuccess: cancelVotingInStore,
		onError: (e) => {
			toast?.add(
				{
					title: `Voting Cancellation failed.`,
					variant: "error",
					description: "Please try again.",
				},
				{
					timeout: 10000,
				},
			);
		},
	});

	return { cancelVoting, isPending };
}
