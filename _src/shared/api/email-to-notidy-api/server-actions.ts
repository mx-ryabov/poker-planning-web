"use server";
import { appFetchPost } from "../../lib/utils/app-fetch";
import { CollectEmailToNotifyRequest } from "./dto/collect-email-to-notify";

export async function collectEmail(email: string) {
	return await appFetchPost<CollectEmailToNotifyRequest, undefined>(
		"/emails-to-notify",
		{ email },
	);
}
