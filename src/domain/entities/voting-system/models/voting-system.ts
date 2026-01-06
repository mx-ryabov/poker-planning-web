import { User } from "../../user";
import { VotingSystemVote } from "./voting-system-vote";

export interface VotingSystem {
	id: string;
	name: string;
	creator: User | null;
	votes: VotingSystemVote[];
}
