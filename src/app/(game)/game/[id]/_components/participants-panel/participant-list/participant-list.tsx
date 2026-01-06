import { GameParticipant } from "@/src/domain/entities/game";
import {
	selectSortedParticipants,
	useGameState,
} from "@/src/app/(game)/game/[id]/_store";
import { ReactNode } from "react";

type Props = {
	children: (participant: GameParticipant) => ReactNode;
};

export function ParticipantList({ children }: Props) {
	const participants = useGameState(selectSortedParticipants);

	return (
		<div className="flex flex-col gap-3 h-full overflow-y-auto">
			{participants.map(children)}
		</div>
	);
}
