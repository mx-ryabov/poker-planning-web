"use server";

import { cookies } from "next/headers";
import { CreateGameRequest, CreateGameResponse } from "./dto";
import { redirect } from "next/navigation";
import { appFetchGet, appFetchPost } from "../../lib/utils/app-fetch";
import { GetGameByIdResponse } from "./dto/get-game-by-id-response";

export async function createGameAsGuest(request: CreateGameRequest) {
	const res = await appFetchPost<CreateGameRequest>("/games", request);

	if (res.ok) {
		const data: CreateGameResponse = await res.json();
		const cookieStore = await cookies();
		cookieStore.set("token", data.masterToken, {
			httpOnly: true,
		});
		redirect(`/game/${data.id}`);
	} else {
		return `Game creation is failed. Status: ${res.status}. Message: ${res.statusText}`;
	}
}

export async function getGameById(gameId: string) {
	const res = await appFetchGet(`/games/${gameId}`);

	if (res.ok) {
		const data: GetGameByIdResponse = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error(
			`Getting Game by ID is failed. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}
