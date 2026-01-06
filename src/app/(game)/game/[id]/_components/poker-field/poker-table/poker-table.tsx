"use client";
import {
	selectCurrentParticipant,
	useGameState,
} from "@/src/app/(game)/game/[id]/_store";
import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";
import { GameActions } from "@/src/domain/entities/game";
import { TablePlayer } from "./components/table-player";
import { TableSvg } from "./assets/table-svg";
import { VotingActions } from "./components/voting-actions";
import { usePokerFieldState } from "../poker-field-provider";
import { VotingInfo } from "./components/voting-info";
import { cva } from "class-variance-authority";
import { TablePlayersSeating } from "./components/table-players-seating";
import { VotingTimer } from "./components/voting-timer";
import {
	GameIntroOnboardingForMaster,
	GameIntroOnboardingForParticipant,
} from "../../onboardings";

export function PokerTable() {
	const canAffectVoting = useGamePermissions(GameActions.ChangeVoting);
	const currentParticipant = useGameState(selectCurrentParticipant);

	const { highlightedVoteId } = usePokerFieldState();

	return (
		<div className="flex h-full w-full items-center justify-center">
			<GameIntroOnboardingForParticipant.Steps.GameTableStep className="rounded-full">
				<GameIntroOnboardingForMaster.Steps.GameTableStep className="rounded-full">
					<div className="relative flex max-h-[calc(100%-100px)] w-[60%] max-w-[900px] items-center justify-center">
						<TableSvg className="rounded-full" />

						<div
							className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col gap-2"
							style={{
								opacity:
									highlightedVoteId === undefined
										? "100%"
										: "40%",
							}}
						>
							{canAffectVoting && (
								<div data-testid="voting-actions">
									<VotingActions />
								</div>
							)}
							{!canAffectVoting && (
								<div data-testid="voting-info">
									<VotingInfo />
								</div>
							)}
							<VotingTimer />
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
										<div
											key={p.id}
											className={playerWrapperStyles({
												isMutedBackground:
													isBackgroundMuted(
														highlightedVoteId,
														p.vote?.id || null,
													),
											})}
										>
											<TablePlayer
												key={p.id}
												participant={p}
												tablePosition={seatRowPosition}
												isCurrentPlayer={
													p.id ===
													currentParticipant.id
												}
											/>
										</div>
									))}
								</div>
							)}
						</TablePlayersSeating>
					</div>
				</GameIntroOnboardingForMaster.Steps.GameTableStep>
			</GameIntroOnboardingForParticipant.Steps.GameTableStep>
		</div>
	);
}

const playerWrapperStyles = cva("transition-all", {
	variants: {
		isMutedBackground: {
			true: "opacity-40",
			false: "scale-110",
			undefined: "scale-100",
		},
	},
});

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

function isBackgroundMuted(
	highlightedVoteId: string | null | undefined,
	voteId: string | null,
) {
	return highlightedVoteId === undefined
		? undefined
		: highlightedVoteId !== voteId;
}
