"use server";

import { cookies } from "next/headers";
import {
	CreateGameRequest,
	CreateGameResponse,
	CreateTicketForGameRequest,
	GameParticipant,
	GameTicket,
} from "./dto";
import { redirect } from "next/navigation";
import {
	appFetchDelete,
	appFetchGet,
	appFetchPost,
	appFetchPut,
} from "../../lib/utils/app-fetch";
import { GetGameByIdResponse } from "./dto/get-game-by-id-response";
import { UpdateTicketForGameRequest } from "./dto/update-ticket-for-game-request";

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
		return data;
	} else {
		throw new Error(
			`Getting Game by ID is failed. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}

export async function getCurrentParticipant(gameId: string) {
	const res = await appFetchGet(`/games/${gameId}/current-participant`);

	if (res.ok) {
		const data: GameParticipant = await res.json();
		return data;
	} else {
		if (res.status === 404) {
			redirect(`/game/${gameId}/join-room`);
		}
		throw new Error(
			`Getting Current Participant by GameId is falied. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}

export async function joinAsGuest(
	gameId: string,
	data: { displayName: string },
) {
	const res = await appFetchPost<{ displayName: string }>(
		`/games/${gameId}/join-as-guest`,
		data,
	);

	if (res.ok) {
		const data: { token: string } = await res.json();
		const cookieStore = await cookies();
		cookieStore.set("token", data.token, {
			httpOnly: true,
		});
		redirect(`/game/${gameId}`);
	} else {
		return `Joining as guest by GameId is falied. Status: ${res.status}. Message: ${res.statusText}`;
	}
}

export async function createTicket(
	gameId: string,
	data: CreateTicketForGameRequest,
) {
	const res = await appFetchPost<CreateTicketForGameRequest>(
		`/games/${gameId}/ticket`,
		data,
	);

	if (res.ok) {
		const data: GameTicket = await res.json();
		return data;
	} else {
		throw new Error(
			`Creating Ticket by GameId is falied. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}

export async function updateTicketById(
	gameId: string,
	ticketId: string,
	data: UpdateTicketForGameRequest,
): Promise<GameTicket> {
	const res = await appFetchPut<{ data: UpdateTicketForGameRequest }>(
		`/games/${gameId}/ticket/${ticketId}`,
		{ data },
	);

	if (res.ok) {
		const data: GameTicket = await res.json();
		return data;
	} else {
		throw new Error(
			`Updating Ticket by GameId and TicketId is falied. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}

export async function deleteTicketById(
	gameId: string,
	ticketId: string,
): Promise<void> {
	const res = await appFetchDelete(`/games/${gameId}/ticket/${ticketId}`);

	if (res.ok) {
		await res.json();
	} else {
		throw new Error(
			`Deleting Ticket by GameId and TicketId is falied. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}

export async function startVoting(
	gameId: string,
	ticketId?: string,
): Promise<void> {
	const res = await appFetchPut(`/games/${gameId}/start-voting`, {
		ticketId,
	});

	if (res.ok) {
		return;
	} else {
		throw new Error(
			`Start Voting by GameId and TicketId is falied. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}

export async function finishVoting(gameId: string): Promise<void> {
	const res = await appFetchPut(`/games/${gameId}/finish-voting`, {});

	if (res.ok) {
		return;
	} else {
		throw new Error(
			`Finish Voting by GameId and TicketId is falied. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
}

export async function vote(
	gameId: string,
	voteId: string | null,
): Promise<void> {
	const res = await appFetchPut(`/games/${gameId}/vote`, { voteId });

	if (res.ok) {
		return;
	} else {
		throw new Error(
			`Vote by GameId is falied. Status: ${res.status}. Message: ${res.statusText}`,
		);
	}
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
