"use server";
import { appFetchGet } from "../../lib/utils/app-fetch";
import { VotingSystem } from "./dto/voting-system";

export async function getVotingSystems(): Promise<VotingSystem[]> {
	const res = await appFetchGet("/voting-systems");

	if (!res.ok) {
		const errorDeatils = await res.text();
		throw new Error(errorDeatils);
	}

	return res.json();
}
