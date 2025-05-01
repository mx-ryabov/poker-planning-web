import {
	selectCurrentParticipant,
	selectParticipants,
	useGameState,
} from "@/_src/pages/game-room/model";
import { GameParticipant } from "@/_src/shared/api";
import { ReactNode, useMemo } from "react";

type RenderChildrenProps = {
	seatedParticipants: GameParticipant[];
	seatRowPosition: SeatRowPosition;
};

type Props = {
	children: (renderProps: RenderChildrenProps) => ReactNode;
};

export function TablePlayersSeating({ children }: Props) {
	const participants = useGameState(selectParticipants);
	const currentParticipant = useGameState(selectCurrentParticipant);

	const seatedParticipants = useMemo(
		() => getSeatedParticipants({ currentParticipant, participants }),
		[participants, currentParticipant],
	);

	return Object.keys(seatedParticipants).map((seatRowPosition) =>
		children({
			seatedParticipants:
				seatedParticipants[seatRowPosition as SeatRowPosition],
			seatRowPosition: seatRowPosition as SeatRowPosition,
		}),
	);
}

type SeatRowPosition = "top" | "right" | "bottom" | "left";
type GetSeatsOptions = {
	currentParticipant: GameParticipant;
	participants: GameParticipant[];
};
type SeatedParticipants = Record<SeatRowPosition, GameParticipant[]>;

function getSeatedParticipants(options: GetSeatsOptions): SeatedParticipants {
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
