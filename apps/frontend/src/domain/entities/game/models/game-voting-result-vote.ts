import { GameVote } from "./game-vote";

export type GameVotingResultVote = {
	id: string;
	vote: GameVote | null;
	participantId: string;
};
