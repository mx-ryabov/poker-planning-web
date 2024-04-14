"use server";

import { cookies } from "next/headers";
import appFetch from "../../lib/app-fetch";
import { CreateGameRequest, CreateGameResponse } from "./dto";
import { redirect } from "next/navigation";

export async function createGameAsGuest(request: CreateGameRequest) {
	const res = await appFetch.post<CreateGameRequest>("/games", request);

	if (res.ok) {
		const data: CreateGameResponse = await res.json();
		cookies().set("token", data.masterToken, {
			httpOnly: true,
		});
		// TODO: refactoring is needed. move the redirect closer to features?
		redirect(`/game/${data.id}`);
	}
}
