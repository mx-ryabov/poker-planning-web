import {
	selectGameSettings,
	selectVotingProcess,
	useGameState,
} from "@/_src/pages/game-room/model";
import { GameVotingStatus } from "@/_src/shared/api";
import { useEffect, useState } from "react";

export function VotingTimer() {
	const settings = useGameState(selectGameSettings);
	const votingProcess = useGameState(selectVotingProcess);

	if (
		votingProcess.status !== GameVotingStatus.InProgress ||
		!settings.isAutoRevealCards
	) {
		return null;
	}

	return (
		<VotingTimerInner
			startTime={votingProcess.startTime}
			autoRevealPeriod={settings.autoRevealPeriod}
			isAutoRevealCards={settings.isAutoRevealCards}
		/>
	);
}

type VotingTimerInnerProps = {
	startTime: string | null;
	autoRevealPeriod: number;
	isAutoRevealCards: boolean;
};

function VotingTimerInner(props: VotingTimerInnerProps) {
	const { startTime, autoRevealPeriod, isAutoRevealCards } = props;
	const initialTimeLeft = calcSecondsLeft(startTime, autoRevealPeriod);
	const [timeLeft, setTimeLeft] = useState<number>(initialTimeLeft);

	useEffect(() => {
		if (startTime === null || !isAutoRevealCards) return;

		const interval = setInterval(() => {
			const secondsLeft = calcSecondsLeft(startTime, autoRevealPeriod);
			if (secondsLeft >= 0) {
				setTimeLeft(secondsLeft);
			} else {
				setTimeLeft(initialTimeLeft);
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			setTimeLeft(initialTimeLeft);
			clearInterval(interval);
		};
	}, [startTime, isAutoRevealCards, autoRevealPeriod, initialTimeLeft]);

	return (
		<div className="flex w-full flex-row items-center justify-center gap-1 text-neutral-500">
			<span>{timeLeft > 0 ? timeLeft : "Time is up!"}</span>
			{timeLeft > 0 && <span className="text-xs">seconds left</span>}
		</div>
	);
}

function calcSecondsLeft(
	startTimeStr: string | null,
	autoRevealPeriod: number,
): number {
	const nowMs = Date.now();
	const startTimeMs = startTimeStr
		? new Date(startTimeStr).getTime()
		: Date.now();

	return autoRevealPeriod - Math.floor((nowMs - startTimeMs) / 1000);
}
