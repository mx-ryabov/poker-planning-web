import { EventSubscriber, useGameEventsHub } from "../state";
import { createContext, ReactNode, useContext } from "react";

const GameEventsContext = createContext<EventSubscriber>(null!);

type Props = {
	accessTokenFactory: () => Promise<string>;
	gameId: string;
	children: ReactNode;
};
export function GameEventsProvider({
	accessTokenFactory,
	gameId,
	children,
}: Props) {
	const eventSubscriber = useGameEventsHub({ accessTokenFactory, gameId });

	return (
		<GameEventsContext.Provider value={eventSubscriber}>
			{children}
		</GameEventsContext.Provider>
	);
}

export function useGameEvents() {
	const eventSubscriber = useContext(GameEventsContext);
	if (eventSubscriber === null) {
		throw new Error("useGameEvents must be used inside GameEventsProvider");
	}

	return eventSubscriber;
}
