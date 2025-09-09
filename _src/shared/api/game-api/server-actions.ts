"use server";

import { cookies } from "next/headers";
import {
	CreateGameRequest,
	CreateGameResponse,
	CreateTicketForGameRequest,
	GameParticipant,
	GameTicket,
	GameVotingResult,
	StartVotingResult,
	UpdateGameSettingsRequest,
} from "./dto";
import { redirect } from "next/navigation";
import {
	appFetchDelete,
	appFetchGet,
	appFetchPost,
	appFetchPut,
	ApiResponse,
} from "../../lib/utils/app-fetch";
import { GetGameByIdResponse } from "./dto/get-game-by-id-response";
import { UpdateTicketForGameRequest } from "./dto/update-ticket-for-game-request";
import { revalidateTag } from "next/cache";
import { UpdateGameSettingsResponse } from "./dto/update-game-settings-response";

export async function createGameAsGuest(
	request: CreateGameRequest,
): ApiResponse<CreateGameResponse> {
	const res = await appFetchPost<CreateGameRequest, CreateGameResponse>(
		"/games",
		request,
	);

	if (res.ok) {
		const cookieStore = await cookies();
		cookieStore.set("token", res.data.masterToken, {
			httpOnly: true,
		});
		redirect(`/game/${res.data.id}`);
	}
	return res;
}

export async function getGameById(gameId: string) {
	return await appFetchGet<{}, GetGameByIdResponse>(
		`/games/${gameId}`,
		undefined,
		{
			tags: ["game-by-id"],
		},
	);
}

export async function getCurrentParticipant(gameId: string) {
	const res = await appFetchGet<{}, GameParticipant>(
		`/games/${gameId}/current-participant`,
	);
	if (!res.ok && res.error.status === 404) {
		redirect(`/game/${gameId}/join-room`);
	}
	return res;
}

export async function joinAsGuest(
	gameId: string,
	data: { displayName: string },
): ApiResponse<{ token: string }> {
	const res = await appFetchPost<{ displayName: string }, { token: string }>(
		`/games/${gameId}/join-as-guest`,
		data,
	);

	if (res.ok) {
		const cookieStore = await cookies();
		cookieStore.set("token", res.data.token, {
			httpOnly: true,
		});
		redirect(`/game/${gameId}`);
	}
	return res;
}

export async function createTicket(
	gameId: string,
	data: CreateTicketForGameRequest,
): ApiResponse<GameTicket> {
	return await appFetchPost<CreateTicketForGameRequest, GameTicket>(
		`/games/${gameId}/ticket`,
		data,
	);
}

export async function updateTicketById(
	gameId: string,
	ticketId: string,
	data: UpdateTicketForGameRequest,
) {
	return await appFetchPut<{ data: UpdateTicketForGameRequest }, GameTicket>(
		`/games/${gameId}/ticket/${ticketId}`,
		{ data },
	);
}

export async function deleteTicketById(gameId: string, ticketId: string) {
	return await appFetchDelete(`/games/${gameId}/ticket/${ticketId}`);
}

export async function startVoting(gameId: string, ticketId: string | null) {
	return await appFetchPut<{ ticketId: string | null }, StartVotingResult>(
		`/games/${gameId}/start-voting`,
		{
			ticketId,
		},
	);
}

export async function revealCards(gameId: string) {
	return await appFetchPut(`/games/${gameId}/reveal-cards`);
}

export async function cancelVoting(gameId: string) {
	return await appFetchPut(`/games/${gameId}/cancel-voting`);
}

export async function finishVoting(gameId: string) {
	return await appFetchPut<undefined, GameVotingResult>(
		`/games/${gameId}/finish-voting`,
	);
}

export async function revalidateGame() {
	revalidateTag("game-by-id");
}

export async function vote(gameId: string, voteId: string | null) {
	return await appFetchPut<{ voteId: string | null }, undefined>(
		`/games/${gameId}/vote`,
		{ voteId },
	);
}

export async function updateSettings(
	gameId: string,
	body: UpdateGameSettingsRequest,
) {
	return await appFetchPut<
		UpdateGameSettingsRequest,
		UpdateGameSettingsResponse
	>(`/games/${gameId}/settings`, body);
}

export async function getToken() {
	const cookieStore = await cookies();
	return cookieStore.get("token")?.value;
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete("token");
	redirect("/");
}
