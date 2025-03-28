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
} from "../../shared/api/game-api/server-actions";

export const API = {
	game: {
		getGameById,
		joinAsGuest,
		createGameAsGuest,
		ticket: { createTicket, updateTicketById, deleteTicketById },
		participant: {
			getCurrentParticipant,
		},
	},
};

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
