"use client";

import VotingSystem from "@/app/_models/voting-system/voting-system";
import { createContext } from "react";

interface CreateGamePageDataState {
	votingSystems: VotingSystem[];
}

interface Props extends CreateGamePageDataState {
	children: React.ReactNode;
}

export const CreateGamePageContext = createContext<CreateGamePageDataState>({
	votingSystems: [],
});

export function CreateGamePageDataProvider({ children, votingSystems }: Props) {
	return (
		<CreateGamePageContext.Provider value={{ votingSystems }}>
			{children}
		</CreateGamePageContext.Provider>
	);
}
