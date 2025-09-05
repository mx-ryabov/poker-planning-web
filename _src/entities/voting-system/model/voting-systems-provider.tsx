import { VotingSystem } from "@/_src/shared/api/voting-system-api";
import { buildProvider, Streamable } from "@/_src/shared/lib";

const [useVotingSystems, VotingSystemsProvider] =
	buildProvider<Streamable<VotingSystem[]>>();

export { useVotingSystems, VotingSystemsProvider };
