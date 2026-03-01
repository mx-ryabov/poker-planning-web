import { useDomainApi } from "@/src/domain/providers";
import { useMutation } from "@/src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../_store";
import { useGlobalToast } from "@/src/shared/ui/components/toast";

export function useFinishVoting() {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const finishVotingInStore = useGameState((state) => state.finishVoting);

	const { mutate: finishVoting, isPending } = useMutation({
		mutateFn: async () => api.game.finishVoting(gameId),
		onSuccess: (result) => {
			finishVotingInStore(result);
		},
		onError: () => {
			toast?.add(
				{
					title: `Finishing Voting failed.`,
					variant: "error",
					description: "Please try again.",
				},
				{
					timeout: 5000,
				},
			);
		},
	});

	return { finishVoting, isPending };
}
