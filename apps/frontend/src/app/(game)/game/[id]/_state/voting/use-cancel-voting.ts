import { useDomainApi } from "@/src/domain/providers";
import { useMutation } from "@/src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../_store";
import { useGlobalToast } from "@/src/shared/ui/components/toast";

export function useCancelVoting() {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const cancelVotingInStore = useGameState((state) => state.cancelVoting);

	const { mutate: cancelVoting, isPending } = useMutation({
		mutateFn: async () => api.game.cancelVoting(gameId),
		onSuccess: cancelVotingInStore,
		onError: () => {
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
