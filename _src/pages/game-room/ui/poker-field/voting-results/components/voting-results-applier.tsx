import { GameTicket, GameVote } from "@/_src/shared/api";
import {
	selectPreliminaryVotingResults,
	selectVotingProcess,
	selectVotingSystemVotes,
	useGameState,
	useTicketUpdate,
	useVotingAsyncState,
} from "../../../../model";
import { Button } from "@/_src/shared/ui/components/button";
import { Select } from "@/_src/shared/ui/components/select";
import type { Key, Selection } from "@react-types/shared";
import { useCallback, useMemo, useState } from "react";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";
import { useConfirmationModal } from "@/_src/shared/providers";

export function VotingResultsApplier() {
	const { ticket } = useGameState(selectVotingProcess);
	const vSVotes = useGameState(selectVotingSystemVotes);
	const results = useGameState(selectPreliminaryVotingResults);

	const votesForApply = useMemo(
		() => results.filter((r) => r !== null),
		[results],
	);
	const mostPopularVoteForApply = useMemo(
		() => getHighestMostPopular(votesForApply),
		[votesForApply],
	);

	if (ticket === null) return null;

	return (
		<VotingResultsApplierInner
			ticket={ticket}
			votesForApply={vSVotes}
			mostPopularVoteForApply={mostPopularVoteForApply}
		/>
	);
}

type InnerProps = {
	ticket: GameTicket;
	votesForApply: GameVote[];
	mostPopularVoteForApply?: GameVote;
};
function VotingResultsApplierInner(props: InnerProps) {
	const { ticket, votesForApply, mostPopularVoteForApply } = props;

	const toast = useGlobalToast();
	const confirmModal = useConfirmationModal();

	const { finishVoting } = useVotingAsyncState();
	const { updateByField } = useTicketUpdate(ticket);

	const [selectedVoteId, setSelectedVoteId] = useState<Key | undefined>(
		mostPopularVoteForApply?.id,
	);
	const selectedVote = useMemo(
		() => votesForApply.find((v) => v.id === selectedVoteId),
		[votesForApply, selectedVoteId],
	);

	const onEstimationSelectionChange = useCallback((keys: Selection) => {
		if (keys instanceof Set) {
			setSelectedVoteId(Array.from(keys)[0]);
		}
	}, []);

	const onApplyPress = useCallback(() => {
		if (!selectedVote) return;
		confirmModal.open({
			title: "Please confirm the action",
			contentMessage: `The estimation ${selectedVote.value} will be applied for ${ticket.identifier} and the voting process will be finished.`,
			confirmBtnText: "Confirm",
			onConfirm: () => {
				Promise.all([
					updateByField("estimation", selectedVote.value),
					finishVoting(),
				])
					.then(() => {})
					.catch(() => {
						toast?.add(
							{
								title: "Something went wrong...",
								description:
									"An error occurred during the estimation and completion of the voting. Please try again.",
								variant: "error",
							},
							{
								timeout: 5000,
							},
						);
					});
			},
		});
	}, [
		confirmModal,
		selectedVote,
		ticket.identifier,
		toast,
		finishVoting,
		updateByField,
	]);

	return (
		<div className="flex flex-row items-end gap-2">
			<Select
				items={votesForApply}
				selectedKeys={selectedVoteId ? [selectedVoteId] : []}
				aria-label="Estimation to apply"
				selectionMode="single"
				placeholder="Select estimation"
				label="Estimation to apply"
				onSelectionChange={onEstimationSelectionChange}
			>
				{(vote) => (
					<Select.Item
						key={vote.id}
						id={vote.id}
						textValue={`${vote.suit} ${vote.value}`}
						aria-label={vote.value}
					>
						{vote.suit} {vote.value}
					</Select.Item>
				)}
			</Select>

			<Button
				data-testid="apply-voting-results-btn"
				isDisabled={!selectedVoteId}
				onPress={onApplyPress}
			>
				Apply
			</Button>
		</div>
	);
}

function getHighestMostPopular(results: GameVote[]) {
	const resultsCounts = new Map<string, { vote: GameVote; count: number }>();
	for (const result of results) {
		if (result === null) continue;
		const resCount = resultsCounts.get(result.id);
		if (resCount === undefined) {
			resultsCounts.set(result.id, { count: 1, vote: result });
		} else {
			resultsCounts.set(result.id, {
				count: resCount.count + 1,
				vote: result,
			});
		}
	}

	let highestMostPopularResult: GameVote | null | undefined = undefined;
	let maxVoutesCount = 0;

	for (const resCount of resultsCounts.values()) {
		if (resCount.count > maxVoutesCount) {
			maxVoutesCount = resCount.count;
			highestMostPopularResult = resCount.vote;
		} else if (
			resCount.count === maxVoutesCount &&
			highestMostPopularResult &&
			highestMostPopularResult.order < resCount.vote.order
		) {
			highestMostPopularResult = resCount.vote;
		}
	}

	return highestMostPopularResult;
}
