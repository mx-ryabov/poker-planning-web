"use client";
import { createContext, ReactNode, useContext } from "react";
import {
	createTicket,
	deleteTicketById,
	updateTicketById,
	getCurrentParticipant,
	getGameById,
	joinAsGuest,
	createGameAsGuest,
	startVoting,
	revealCards,
	finishVoting,
	cancelVoting,
	revalidateGame,
	vote,
	updateSettings,
} from "../../shared/api/game-api/server-actions";
import { ApiResponse } from "../lib/utils/app-fetch";
import { ApiError } from "../lib";
import { collectEmail } from "../api";

export const API = {
	game: {
		getGameById: makeThrowable(getGameById),
		joinAsGuest: makeThrowable(joinAsGuest),
		createGameAsGuest: makeThrowable(createGameAsGuest),
		startVoting: makeThrowable(startVoting),
		revealCards: makeThrowable(revealCards),
		finishVoting: makeThrowable(finishVoting),
		cancelVoting: makeThrowable(cancelVoting),
		revalidateGame,
		vote: makeThrowable(vote),
		updateSettings: makeThrowable(updateSettings),
		ticket: {
			createTicket: makeThrowable(createTicket),
			updateTicketById: makeThrowable(updateTicketById),
			deleteTicketById: makeThrowable(deleteTicketById),
		},
		participant: {
			getCurrentParticipant: makeThrowable(getCurrentParticipant),
		},
	},
	emailToNotify: {
		collectEmail: makeThrowable(collectEmail),
	},
};

type ActionFunction<TReq extends object, TRes, TParams extends unknown[]> = (
	...params: TParams
) => ApiResponse<TReq, TRes>;
type ThrowableFunction<TRes, TParams extends unknown[]> = (
	...params: TParams
) => Promise<TRes>;

function makeThrowable<TReq extends object, TRes, TParams extends unknown[]>(
	action: ActionFunction<TReq, TRes, TParams>,
): ThrowableFunction<TRes, TParams> {
	return async function (
		...params: Parameters<ActionFunction<TReq, TRes, TParams>>
	) {
		const res = await action(...params);

		if (!res.ok) {
			throw new ApiError(res.error);
		}
		return res.data;
	};
}

export type ApiContextProps = typeof API;

export const ApiContext = createContext<ApiContextProps>(null!);

type ApiProviderProps = {
	children: ReactNode;
};

export function ApiProvider({ children }: ApiProviderProps) {
	return <ApiContext.Provider value={API}>{children}</ApiContext.Provider>;
}

export function useApi() {
	const context = useContext(ApiContext);
	if (!context) {
		throw new Error("useApi must be used within a ApiProvider");
	}
	return context;
}
