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
	const [timeLeft, setTimeLeft] = useState<number | undefined>();

	useEffect(() => {
		if (votingProcess.startTime === null || !settings.isAutoRevealCards)
			return;

		const startTime = new Date(votingProcess.startTime);
		let secondsLeft = calcSecondsLeft(startTime, settings.autoRevealPeriod);
		setTimeLeft(secondsLeft);

		const interval = setInterval(() => {
			secondsLeft = calcSecondsLeft(startTime, settings.autoRevealPeriod);
			if (secondsLeft >= 0) {
				setTimeLeft(secondsLeft);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [votingProcess.startTime, settings]);

	if (
		votingProcess.status !== GameVotingStatus.InProgress ||
		!settings.isAutoRevealCards ||
		timeLeft === undefined
	)
		return null;

	return (
		<div className="flex w-full flex-row items-center justify-center gap-1 text-neutral-500">
			<span>{timeLeft > 0 ? timeLeft : "Time is up!"}</span>
			{timeLeft > 0 && <span className="text-xs">seconds left</span>}
		</div>
	);
}

function calcSecondsLeft(startTime: Date, autoRevealPeriod: number): number {
	const nowMs = Date.now();
	const startTimeMs = startTime.getTime();

	return autoRevealPeriod - Math.ceil((nowMs - startTimeMs) / 1000);
}
