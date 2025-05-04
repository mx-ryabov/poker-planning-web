import { useApi } from "@/_src/app";
import { useMutation } from "@/_src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../store";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

export function useFinishVoting() {
	const api = useApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const finishVotingInStore = useGameState((state) => state.finishVoting);

	const { mutate: finishVoting, isPending } = useMutation({
		mutateFn: () => api.game.finishVoting(gameId),
		onSuccess: (result) => {
			finishVotingInStore(result);
		},
		onError: (e) => {
			console.log(e);

			toast?.add({
				title: `Finishing Voting failed.`,
				variant: "error",
				description: "Please try again.",
			});
		},
	});

	return { finishVoting, isPending };
}
