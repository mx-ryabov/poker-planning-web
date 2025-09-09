import { useApi } from "@/_src/shared/providers";
import { useMutation } from "@/_src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../store";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

export function useStartVoting() {
	const api = useApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const startVotingInStore = useGameState((state) => state.startVoting);

	const { mutate: startVoting, isPending } = useMutation({
		mutateFn: async (ticketId: string | null) => {
			const res = await api.game.startVoting(gameId, ticketId);
			if (!res.ok) throw res.error;
			return res.data;
		},
		onSuccess: (response, ticket) => startVotingInStore(ticket, response),
		onError: (error) =>
			toast?.add(
				{
					title: `Starting Voting failed. ${error.message}`,
					variant: "error",
					description: "Please try again",
				},
				{
					timeout: 5000,
				},
			),
	});

	return { startVoting, isPending };
}
