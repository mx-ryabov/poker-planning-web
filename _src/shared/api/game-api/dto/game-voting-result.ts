import { GameVotingResultVote } from "./game-voting-result-vote";

export type GameVotingResult = {
	id: string;
	ticketId: string | null;
	createdAt: string;
	votes: GameVotingResultVote[];
};
