import { GameTicket } from "./game-ticket";
import { GameVotingStatus } from "./game-voting-status";

export type GameVotingProcess = {
	status: GameVotingStatus;
	ticket: GameTicket | null;
};
