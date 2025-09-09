"use server";
import { ApiResponse, appFetchPost } from "../../lib/utils/app-fetch";
import { CollectEmailToNotifyRequest } from "./dto/collect-email-to-notify";

export async function collectEmail(
	email: string,
): ApiResponse<{ ok: boolean }> {
	const res = await appFetchPost<CollectEmailToNotifyRequest, void>(
		"/emails-to-notify",
		{ email },
	);

	if (res.ok) {
		return {
			...res,
			data: { ok: true },
		};
	}
	return res;
}
