import { VotingSystem } from "@/_src/shared/api/voting-system-api";
import { buildProvider } from "@/_src/shared/lib";

const [useVotingSystems, VotingSystemsProvider] =
	buildProvider<VotingSystem[]>();

export { useVotingSystems, VotingSystemsProvider };
