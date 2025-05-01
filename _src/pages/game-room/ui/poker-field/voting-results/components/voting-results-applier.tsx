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
import { useConfirmationModal } from "@/_src/app";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

export function VotingResultsApplier() {
	const { ticket } = useGameState(selectVotingProcess);
	const vSVotes = useGameState(selectVotingSystemVotes);
	const results = useGameState(selectPreliminaryVotingResults);

	const votesForApply = useMemo(
		() => getUniqueVotes(results.filter((r) => r !== null)),
		[results],
	);
	const mostPopularVoteForApply = useMemo(
		() => getHighestMostPopular(votesForApply),
		[votesForApply],
	);

	if (
		ticket === null ||
		votesForApply.length === 0 ||
		mostPopularVoteForApply === null
	)
		return null;

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
	mostPopularVoteForApply: GameVote;
};
function VotingResultsApplierInner(props: InnerProps) {
	const { ticket, votesForApply, mostPopularVoteForApply } = props;

	const toast = useGlobalToast();
	const confirmModal = useConfirmationModal();

	const { finishVoting } = useVotingAsyncState();
	const { updateByField } = useTicketUpdate(ticket);

	const [selectedVoteId, setSelectedVoteId] = useState<Key>(
		mostPopularVoteForApply.id,
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
					.then(() => {
						toast?.add({
							title: "Congratulations!",
							description: `The ticket ${ticket.identifier} has been estimated - ${selectedVote.value}`,
							variant: "success",
						});
					})
					.catch((e) => {
						toast?.add({
							title: "Something went wrong...",
							description:
								"An error occurred during the estimation and completion of the voting. Please try again.",
							variant: "error",
						});
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
			<div className="w-[120px]">
				<Select
					items={votesForApply}
					selectedKeys={[selectedVoteId]}
					aria-label="Estimation to apply"
					selectionMode="single"
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
			</div>

			<Button title="Apply" onPress={onApplyPress} />
		</div>
	);
}

function getHighestMostPopular(results: GameVote[]) {
	const resultsCounts = new Map<string, { vote: GameVote; count: number }>();
	for (let result of results) {
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

	let highestMostPopularResult: GameVote | null = null;
	let maxVoutesCount = 0;
	for (let resCount of resultsCounts.values()) {
		if (
			resCount.count === maxVoutesCount &&
			highestMostPopularResult !== null &&
			highestMostPopularResult.order < resCount.vote.order
		) {
			highestMostPopularResult = resCount.vote;
		}
		if (resCount.count > maxVoutesCount) {
			maxVoutesCount = resCount.count;
			highestMostPopularResult = resCount.vote;
		}
	}

	return highestMostPopularResult;
}

function getUniqueVotes(results: (GameVote | null)[]): GameVote[] {
	const votesSet = new Set<string>();
	return results.filter((r) => {
		if (r === null) return false;
		if (votesSet.has(r.id)) {
			return false;
		}
		votesSet.add(r.id);
		return true;
	}) as GameVote[];
}
