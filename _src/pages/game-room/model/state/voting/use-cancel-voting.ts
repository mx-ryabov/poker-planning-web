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
		mutateFn: () => api.game.cancelVoting(gameId),
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
