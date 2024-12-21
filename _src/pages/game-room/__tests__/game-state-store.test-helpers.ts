import {
	GameParticipant,
	GetGameByIdResponse,
	ParticipantRole,
} from "@/_src/shared/api/game-api";
import { NEWLY_CREATED_GAME } from "@/_src/shared/mocks/game";

export function generateGame(
	overrideGame: Partial<GetGameByIdResponse>,
): GetGameByIdResponse {
	return {
		...NEWLY_CREATED_GAME,
		...overrideGame,
	};
}

export function generateParticipant(
	overrideParticipant: Partial<GameParticipant>,
): GameParticipant {
	return {
		id: uuidv4(),
		online: false,
		displayName: "",
		userId: uuidv4(),
		role: ParticipantRole.VotingMember,
		...overrideParticipant,
	};
}

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			const r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		},
	);
}
