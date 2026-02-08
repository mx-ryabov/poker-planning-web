import { VotingSystem } from "../models/voting-system";
import { buildProvider, Streamable } from "@/src/shared/lib";

const [useVotingSystems, VotingSystemsProvider] =
	buildProvider<Streamable<VotingSystem[]>>();

export { useVotingSystems, VotingSystemsProvider };
