"use server";
import { appFetchGet } from "../../lib/utils/app-fetch";
import { VotingSystem } from "./dto/voting-system";

export async function getVotingSystems(): Promise<VotingSystem[]> {
	const res = await appFetchGet<{}, VotingSystem[]>("/voting-systems");

	if (!res.ok) {
		throw res.error;
	}

	return res.data;
}
