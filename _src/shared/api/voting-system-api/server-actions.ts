"use server";
import { appFetchGet } from "../../lib/utils/app-fetch";
import { VotingSystem } from "./dto/voting-system";

export async function getVotingSystems(): Promise<VotingSystem[]> {
	const res = await appFetchGet("/voting-systems");

	if (!res.ok) {
		throw new Error(res.statusText);
	}

	return res.json();
}
