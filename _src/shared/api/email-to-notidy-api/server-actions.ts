"use server";
import { appFetchPost } from "../../lib/utils/app-fetch";
import { CollectEmailToNotifyRequest } from "./dto/collect-email-to-notify";

export async function collectEmail(email: string): Promise<{ ok: boolean }> {
	const res = await appFetchPost<CollectEmailToNotifyRequest>(
		"/emails-to-notify",
		{ email },
	);

	if (res.ok) {
		return { ok: true };
	} else {
		throw new Error(
			`Email collecting has failed. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}
