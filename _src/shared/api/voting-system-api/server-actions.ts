import appFetch from "../../lib/app-fetch";
import { VotingSystem } from "./dto/voting-system";

export async function getVotingSystems(): Promise<VotingSystem[]> {
	const res = await appFetch.get("/voting-systems");

	if (!res.ok) {
		throw new Error(res.statusText);
	}

	return res.json();
}
