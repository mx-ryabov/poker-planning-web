import User from "../user/user";
import VotingSystemVote from "./voting-system-vote";

export default interface VotingSystem {
	id: string;
	name: string;
	creator?: User;
	votes: VotingSystemVote[];
}
