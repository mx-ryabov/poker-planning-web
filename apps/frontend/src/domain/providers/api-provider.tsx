"use client";
import { createContext, ReactNode, useContext } from "react";
import {
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
	createTicket,
	updateTicketById,
	deleteTicketById,
	getCurrentParticipant,
} from "../entities/game";
import { collectEmail } from "../entities/email-to-notify";
import { ApiResponse } from "@/src/shared/lib/utils/app-fetch";
import { ApiError } from "@/src/shared/lib";

export const DOMAIN_API = {
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

type ActionFunction<TRes, TParams extends unknown[]> = (
	...params: TParams
) => ApiResponse<TRes>;
type ThrowableFunction<TRes, TParams extends unknown[]> = (
	...params: TParams
) => Promise<TRes>;

function makeThrowable<TRes, TParams extends unknown[]>(
	action: ActionFunction<TRes, TParams>,
): ThrowableFunction<TRes, TParams> {
	return async function (
		...params: Parameters<ActionFunction<TRes, TParams>>
	) {
		const res = await action(...params);

		if (!res.ok) {
			throw new ApiError(res.error);
		}
		return res.data;
	};
}

export type DomainApiContextProps = typeof DOMAIN_API;

export const DomainApiContext = createContext<DomainApiContextProps>(null!);

type DomainApiProviderProps = {
	children: ReactNode;
};

export function DomainApiProvider({ children }: DomainApiProviderProps) {
	return (
		<DomainApiContext.Provider value={DOMAIN_API}>
			{children}
		</DomainApiContext.Provider>
	);
}

export function useDomainApi() {
	const context = useContext(DomainApiContext);
	if (!context) {
		throw new Error("useDomainApi must be used within a DomainApiProvider");
	}
	return context;
}
