import { createContext, ReactNode, useContext, useState } from "react";

type PokerFieldContextValue = {
	highlightedVoteId: string | null | undefined;
};
type PokerFieldContextAction = {
	setHighlightedVoteId: (voteId: string | null | undefined) => void;
};

export const PokerFieldStateContext =
	createContext<PokerFieldContextValue | null>(null);
export const PokerFieldActionContext =
	createContext<PokerFieldContextAction | null>(null);

type Props = {
	children: ReactNode;
};
export function PokerFieldProvider({ children }: Props) {
	const [highlightedVoteId, setHighlightedVoteId] = useState<
		string | null | undefined
	>(undefined);

	return (
		<PokerFieldActionContext.Provider value={{ setHighlightedVoteId }}>
			<PokerFieldStateContext.Provider value={{ highlightedVoteId }}>
				{children}
			</PokerFieldStateContext.Provider>
		</PokerFieldActionContext.Provider>
	);
}

export function usePokerFieldState() {
	const value = useContext(PokerFieldStateContext);
	if (value === null) {
		throw new Error(
			"usePokerFieldState shoould be used within PokerFieldProvider",
		);
	}
	return value;
}

export function usePokerFieldAction() {
	const value = useContext(PokerFieldActionContext);
	if (value === null) {
		throw new Error(
			"usePokerFieldAction shoould be used within PokerFieldProvider",
		);
	}
	return value;
}
