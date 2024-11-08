"use server";

import { cookies } from "next/headers";
import { CreateGameRequest, CreateGameResponse } from "./dto";
import { redirect } from "next/navigation";
import { appFetchPost } from "../../lib/utils/app-fetch";

export async function createGameAsGuest(request: CreateGameRequest) {
	const res = await appFetchPost<CreateGameRequest>("/games", request);

	if (res.ok) {
		const data: CreateGameResponse = await res.json();
		const cookieStore = await cookies();
		cookieStore.set("token", data.masterToken, {
			httpOnly: true,
		});
		// TODO: refactoring is needed. move the redirect closer to features?
		redirect(`/game/${data.id}`);
	}
}
