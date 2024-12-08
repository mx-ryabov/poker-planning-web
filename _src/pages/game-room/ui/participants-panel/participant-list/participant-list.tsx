import { GameParticipant } from "@/_src/shared/api";
import { selectParticipants, useGameState } from "../../../model";
import { ReactNode } from "react";

type Props = {
	children: (participant: GameParticipant) => ReactNode;
};

export function ParticipantList({ children }: Props) {
	const participants = useGameState(selectParticipants);

	return (
		<div className="flex flex-col gap-3 h-full overflow-y-auto">
			{participants.map(children)}
		</div>
	);
}
