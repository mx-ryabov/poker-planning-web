"use server";
import { appFetchGet } from "../../../../shared/lib/utils/app-fetch";
import { VotingSystem } from "../models/voting-system";

export async function getVotingSystems(): Promise<VotingSystem[]> {
	const res = await appFetchGet<{}, VotingSystem[]>("/voting-systems");

	if (!res.ok) {
		throw res.error;
	}

	return res.data;
}
