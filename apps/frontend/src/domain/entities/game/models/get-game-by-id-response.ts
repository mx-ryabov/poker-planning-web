import { VotingSystem } from "../../voting-system";
import { GameParticipant } from "./game-participant";
import { GameSettings } from "./game-settings";
import { GameTicket } from "./game-ticket";
import { GameVotingProcess } from "./game-voting-process";
import { GameVotingResult } from "./game-voting-result";

export type GetGameByIdResponse = {
	id: string;
	name: string;
	link: string;
	settings: GameSettings;
	votingProcess: GameVotingProcess;
	votingSystem: VotingSystem;
	participants: GameParticipant[];
	tickets: GameTicket[];
	votingResults: GameVotingResult[];
};
