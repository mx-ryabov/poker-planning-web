import { VotingSystem } from "@/_src/shared/api/voting-system-api";
import { useProviderBuilder } from "@/_src/shared/lib";

const [useVotingSystems, VotingSystemsProvider] = useProviderBuilder<
	VotingSystem[]
>([]);

export { useVotingSystems, VotingSystemsProvider };
