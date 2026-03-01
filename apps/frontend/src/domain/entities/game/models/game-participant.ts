import { GameVote } from "./game-vote";
import { ParticipantRole } from "./participant-role";

export type GameParticipant = {
	id: string;
	displayName: string;
	role: ParticipantRole;
	online: boolean;
	userId: string;
	vote: GameVote | null;
};
