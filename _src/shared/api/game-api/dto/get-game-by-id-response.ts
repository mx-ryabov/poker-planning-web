import { VotingSystem } from "../../voting-system-api";
import { GameParticipant } from "./game-participant";
import { GameSettings } from "./game-settings";
import { GameTicket } from "./game-ticket";
import { GameVotingProcess } from "./game-voting-process";

export type GetGameByIdResponse = {
	id: string;
	name: string;
	link: string;
	settings: GameSettings;
	votingProcess: GameVotingProcess;
	votingSystem: VotingSystem;
	participants: GameParticipant[];
	tickets: GameTicket[];
};
