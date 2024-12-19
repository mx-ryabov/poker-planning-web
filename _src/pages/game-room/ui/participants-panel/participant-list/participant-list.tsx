import { GameParticipant } from "@/_src/shared/api";
import { selectSortedParticipants, useGameState } from "../../../model";
import { ReactNode } from "react";

type Props = {
	children: (participant: GameParticipant) => ReactNode;
};

/**
 * Bugs:
 * 2. Fix Error boundary. It shows the error screen even if there is a small error
 * 4. Make a vlidation for the user name that only letters and spaces are allowed
 * 5. if a user has a token for one game and then uses a link to another game then the error occurs.
 * We need to handle this by cleaning token and redirecting to the new URL again
 */

export function ParticipantList({ children }: Props) {
	const participants = useGameState(selectSortedParticipants);

	return (
		<div className="flex flex-col gap-3 h-full overflow-y-auto">
			{participants.map(children)}
		</div>
	);
}
