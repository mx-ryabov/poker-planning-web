"use server";
import appFetch from "@/app/_common/app-fetch";
import CreateGameRequest from "@/app/_models/game/create-game-request";
import CreateGameResponse from "@/app/_models/game/create-game-response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createGameAsGuest(request: CreateGameRequest) {
	const res = await appFetch.post<CreateGameRequest>("/games", request);

	if (res.ok) {
		const data: CreateGameResponse = await res.json();
		cookies().set("token", data.masterToken, {
			httpOnly: true,
		});
		redirect(`/game/${data.id}`);
	}
}
