"use client";
import { GameParticipant } from "@/_src/shared/api";
import {
	selectCurrentParticipant,
	selectParticipants,
	useGameState,
} from "../../../model";
import { TablePlayer } from "./components/table-player";
import { TableSvg } from "./components/table-svg";
import { useMemo } from "react";
import { VoteButton } from "../../vote-button";

export function PokerTable() {
	const participants = useGameState(selectParticipants);
	const currentParticipant = useGameState(selectCurrentParticipant);

	const seatedParticipants = useMemo(
		() => getSeatedParticipants({ currentParticipant, participants }),
		[participants, currentParticipant],
	);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="relative h-fit w-fit">
				<TableSvg />
				<div className="absolute top-1/2 left-1/2 -translate-1/2">
					<VoteButton
						title={{
							notStarted: "Start Voting",
							currentInProgress: "Finish Voting",
							anotherInProgress: "Finish Voting",
						}}
						ticketId={null}
						isFinishingAlwaysAllowed
					/>
				</div>
				<div className="items-between absolute right-0 bottom-0 left-0 flex translate-y-1/2 flex-row justify-center gap-8">
					{seatedParticipants.bottom.map((p) => (
						<TablePlayer
							key={p.id}
							name={p.displayName}
							status="thinking"
							tablePosition="bottom"
							isCurrentPlayer={p.id === currentParticipant.id}
						/>
					))}
				</div>
				<div className="absolute top-0 right-0 bottom-0 flex h-full translate-x-1/2 flex-col items-center justify-center gap-3">
					{seatedParticipants.right.map((p) => (
						<TablePlayer
							key={p.id}
							name={p.displayName}
							status="ready"
							tablePosition="right"
							isCurrentPlayer={p.id === currentParticipant.id}
						/>
					))}
				</div>
				<div className="items-between absolute top-0 right-0 left-0 flex -translate-y-1/2 flex-row justify-center gap-3">
					{seatedParticipants.top.map((p) => (
						<TablePlayer
							key={p.id}
							name={p.displayName}
							status="revealed"
							tablePosition="top"
							isCurrentPlayer={p.id === currentParticipant.id}
						/>
					))}
				</div>
				<div className="absolute top-0 bottom-0 left-0 flex -translate-x-1/2 flex-col items-center justify-center gap-3">
					{seatedParticipants.left.map((p) => (
						<TablePlayer
							key={p.id}
							name={p.displayName}
							status="thinking"
							tablePosition="left"
							isCurrentPlayer={p.id === currentParticipant.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

type GetSeatsOptions = {
	currentParticipant: GameParticipant;
	participants: GameParticipant[];
};

function getSeatedParticipants(options: GetSeatsOptions) {
	const { currentParticipant, participants } = options;
	const top: GameParticipant[] = [];
	const right: GameParticipant[] = [];
	const bottom: GameParticipant[] = [];
	const left: GameParticipant[] = [];

	participants
		.filter((p) => p.id !== currentParticipant.id)
		.forEach((p, ind) => {
			if (p.id === currentParticipant.id) {
				return;
			}
			// put on bottom
			if ((ind + 1) % 4 === 0) {
				bottom.push(p);
			}
			// put on right
			if ((ind + 1) % 4 === 1) {
				right.push(p);
			}
			// put on top
			if ((ind + 1) % 4 === 2) {
				top.push(p);
			}
			// put on left
			if ((ind + 1) % 4 === 3) {
				left.push(p);
			}
		});
	// put 'You' in the middle of bottom
	bottom.splice(Math.floor(bottom.length - 1) / 2, 0, currentParticipant);

	return {
		bottom,
		right,
		top,
		left,
	};
}
