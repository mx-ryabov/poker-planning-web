import { StringHelper } from "@/_src/shared/lib/utils";
import { cva } from "class-variance-authority";
import { useMemo } from "react";
import { CardFaceDownSvg } from "../assets/card-face-down-svg";
import { GameParticipant, GameVotingStatus } from "@/_src/shared/api";
import {
	selectVotingProcess,
	useGameState,
} from "@/_src/pages/game-room/model";

export type TablePlayerProps = {
	isCurrentPlayer: boolean;
	participant: GameParticipant;
	tablePosition: "top" | "right" | "bottom" | "left";
};

export function TablePlayer(props: TablePlayerProps) {
	const { isCurrentPlayer, participant, tablePosition } = props;

	const votingStatus = useTablePlayerStatus(participant);

	const initials = useMemo(() => {
		return StringHelper.getFirstLetters(
			participant.displayName,
			2,
		).toUpperCase();
	}, [participant.displayName]);

	return (
		<div className="relative h-10 w-10">
			{/* {participant.role === ParticipantRole.Master && (
				<>
					<CrownIcon
						size={20}
						className="absolute -top-6 left-1/2 -translate-x-1/2 text-neutral-900"
					/>
				</>
			)} */}
			<div className="absolute inset-0 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white bg-neutral-300 text-base text-neutral-900 drop-shadow-sm">
				{isCurrentPlayer ? "You" : initials}
			</div>
			<div className={nameStyles({ tablePosition })}>
				{participant.displayName}
			</div>
			<div className={statusStyles({ tablePosition })}>
				{votingStatus === "ready" && (
					<div className="p-2" data-testid="ready-status">
						<CardFaceDownSvg />
					</div>
				)}
				{votingStatus === "thinking" && (
					<div
						className={thinkingStatusStyles({ tablePosition })}
						data-testid="thinking-status"
					>
						<div className="bg-primary-500 h-1 w-1 animate-[simple-ping_linear_1s_infinite] rounded-full"></div>
						<div className="bg-primary-500 h-1 w-1 animate-[simple-ping_linear_2s_infinite] rounded-full"></div>
						<div className="bg-primary-500 h-1 w-1 animate-[simple-ping_linear_3s_infinite] rounded-full"></div>
					</div>
				)}
				{votingStatus === "revealed" && participant.vote && (
					<div className="p-5" data-testid="revealed-status">
						<div className="bg-primary-600 border-primary-100 text-primary-100 flex h-8 w-6 items-center justify-center rounded-sm border-2 text-base">
							{participant.vote?.value}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

type TabelPlayerStatus = "thinking" | "ready" | "revealed" | "awaiting";

function useTablePlayerStatus(participant: GameParticipant): TabelPlayerStatus {
	const votingProcess = useGameState(selectVotingProcess);

	const isVoted = useMemo(
		() => participant.vote !== null,
		[participant.vote],
	);

	if (votingProcess.status === GameVotingStatus.Inactive) return "awaiting";
	if (votingProcess.status === GameVotingStatus.Revealed) return "revealed";
	if (votingProcess.status === GameVotingStatus.InProgress && isVoted)
		return "ready";
	return "thinking";
}

const nameStyles = cva(["text-center text-xs text-neutral-900", "absolute"], {
	variants: {
		tablePosition: {
			top: "top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2",
			right: "right-0 top-1/2 -translate-y-1/2 translate-x-full pl-2 text-left",
			bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2",
			left: "left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 text-right",
		},
	},
});

const statusStyles = cva(["absolute"], {
	variants: {
		tablePosition: {
			top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
			left: "right-0 top-1/2 -translate-y-1/2 translate-x-full",
			bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
			right: "left-0 top-1/2 -translate-y-1/2 -translate-x-full",
		},
	},
});

const thinkingStatusStyles = cva(["flex gap-1 p-2"], {
	variants: {
		tablePosition: {
			top: "flex-row",
			left: "flex-col",
			bottom: "flex-row",
			right: "flex-col",
		},
	},
});
