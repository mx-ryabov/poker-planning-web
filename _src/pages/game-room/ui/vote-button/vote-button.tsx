import { Button } from "@/_src/shared/ui/components/button";
import {
	selectCurrentGameId,
	useGameState,
	useIsStartVotingAllowed,
} from "../../model";
import { useVoteButtonState } from "./state/use-vote-button-state";
import { useVoteButton, UseVoteButtonProps } from "./behavior/use-vote-button";

type Props = {
	ticketId: string | null;
} & UseVoteButtonProps;

export function VoteButton({ ticketId, ...props }: Props) {
	const isAllowed = useIsStartVotingAllowed();
	const gameId = useGameState(selectCurrentGameId);

	const state = useVoteButtonState(gameId, ticketId);
	const btnProps = useVoteButton(state, props);

	if (!isAllowed) return null;

	return <Button {...btnProps} />;
}
