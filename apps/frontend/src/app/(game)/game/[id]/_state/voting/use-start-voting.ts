import { useDomainApi } from "@/src/domain/providers/api-provider";
import { useMutation } from "@/src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../_store";
import { useGlobalToast } from "@/src/shared/ui/components/toast";

export function useStartVoting() {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const startVotingInStore = useGameState((state) => state.startVoting);

	const { mutate: startVoting, isPending } = useMutation({
		mutateFn: async (ticketId: string | null) =>
			api.game.startVoting(gameId, ticketId),
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
