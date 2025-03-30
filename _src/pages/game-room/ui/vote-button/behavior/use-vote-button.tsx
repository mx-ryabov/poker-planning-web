import { LabeledButtonProps } from "@/_src/shared/ui/components/button";
import { UseVoteButtonStateProps } from "../state/use-vote-button-state";
import { VotingStatus } from "../types";
import { ReactElement, useCallback } from "react";
import { CardsIcon } from "@/_src/shared/ui/components/icon/svg/cards.icon";
import { RequiredFields } from "@/_src/shared/lib/types";

export type UseVoteButtonProps = {
	title: Record<VotingStatus, string>;
	contentLeft?: Partial<Record<VotingStatus, ReactElement>>;
	isFinishingAlwaysAllowed?: boolean;
} & Omit<LabeledButtonProps, "title" | "isDisabled" | "contentLeft">;

export function useVoteButton(
	state: UseVoteButtonStateProps,
	props: UseVoteButtonProps,
): RequiredFields<LabeledButtonProps, "onPress" | "isDisabled"> {
	const { votingStatus, startVoting, finishVoting } = state;
	const { isFinishingAlwaysAllowed, contentLeft, title, ...btnProps } = props;

	const isDisabled =
		votingStatus === "anotherInProgress" && !isFinishingAlwaysAllowed;
	const contentLeftInner = contentLeft?.[votingStatus] || (
		<CardsIcon size={18} />
	);
	const titleInner = title[votingStatus];

	const onPress = useCallback(() => {
		if (votingStatus === "notStarted") startVoting();
		if (votingStatus === "currentInProgress") finishVoting();
		if (votingStatus === "anotherInProgress" && isFinishingAlwaysAllowed)
			finishVoting();
	}, [startVoting, finishVoting, votingStatus, isFinishingAlwaysAllowed]);

	return {
		...btnProps,
		title: titleInner,
		isDisabled,
		contentLeft: contentLeftInner,
		onPress,
	};
}
