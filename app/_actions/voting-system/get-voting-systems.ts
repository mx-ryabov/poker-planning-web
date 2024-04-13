import appFetch from "@/app/_common/app-fetch";
import VotingSystem from "@/app/_models/voting-system/voting-system";

export default async function getVotingSystems(): Promise<VotingSystem[]> {
	const res = await appFetch.get("/voting-systems");

	if (!res.ok) {
		throw new Error(res.statusText);
	}

	return res.json();
}
