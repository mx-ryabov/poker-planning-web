import { GameTicket } from "./game-ticket";
import { GameVotingStatus } from "./game-voting-status";

export type GameVotingProcess = {
	status: GameVotingStatus;
	startTime: string | null;
	ticket: GameTicket | null;
};
