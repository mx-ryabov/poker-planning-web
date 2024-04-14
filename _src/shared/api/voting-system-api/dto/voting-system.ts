import { User } from "../../user-api";
import { VotingSystemVote } from "./voting-system-vote";

export interface VotingSystem {
	id: string;
	name: string;
	creator?: User;
	votes: VotingSystemVote[];
}
