"use client";
import {
	selectCurrentParticipant,
	useGameState,
	usePermissions,
} from "../../../model";
import { TablePlayer } from "./components/table-player";
import { TableSvg } from "./assets/table-svg";
import { VotingActions } from "./components/voting-actions";
import { usePokerFieldState } from "../poker-field-provider";
import { VotingInfo } from "./components/voting-info";
import { cva } from "class-variance-authority";
import { TablePlayersSeating } from "./components/table-players-seating";

export function PokerTable() {
	const isActionsVisible = usePermissions("ChangeVoting");
	const currentParticipant = useGameState(selectCurrentParticipant);

	const { highlightedVoteId } = usePokerFieldState();

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="relative flex max-h-[calc(100%-100px)] w-[60%] max-w-[900px] items-center justify-center">
				<TableSvg />

				<div
					className="absolute top-1/2 left-1/2 -translate-1/2"
					style={{
						opacity:
							highlightedVoteId === undefined ? "100%" : "40%",
					}}
				>
					{isActionsVisible && <VotingActions />}
					{!isActionsVisible && <VotingInfo />}
				</div>
				<TablePlayersSeating>
					{({ seatedParticipants, seatRowPosition }) => (
						<div
							key={seatRowPosition}
							className={seatsRowStyles({
								position: seatRowPosition,
							})}
						>
							{seatedParticipants.map((p) => (
								<TablePlayer
									key={p.id}
									name={p.displayName}
									participant={p}
									tablePosition={seatRowPosition}
									isCurrentPlayer={
										p.id === currentParticipant.id
									}
								/>
							))}
						</div>
					)}
				</TablePlayersSeating>
			</div>
		</div>
	);
}

const seatsRowStyles = cva("absolute flex justify-center", {
	variants: {
		position: {
			top: "items-between top-0 right-0 left-0 -translate-y-1/2 flex-row gap-3",
			right: "top-0 right-0 bottom-0 h-full translate-x-1/2 flex-col items-center gap-3",
			bottom: "items-between right-0 bottom-0 left-0 translate-y-1/2 flex-row gap-8",
			left: "top-0 bottom-0 left-0 -translate-x-1/2 flex-col items-center gap-3",
		},
	},
});
