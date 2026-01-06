import { useGameEventsDispatcher } from "./game-events-dispatcher";
import { GameEventsProvider, useGameEvents } from "./game-events-hub";
import { useGameStore } from "../_store";

type Props = {
	children: React.ReactNode;
	accessTokenFactory: () => Promise<string>;
	gameId: string;
};

export function GamePageEventsProvider({
	children,
	accessTokenFactory,
	gameId,
}: Props) {
	return (
		<GameEventsProvider
			accessTokenFactory={accessTokenFactory}
			gameId={gameId}
		>
			<GameEventDispatcher />
			{children}
		</GameEventsProvider>
	);
}

function GameEventDispatcher() {
	const eventSubscriber = useGameEvents();
	const gameStateStore = useGameStore();
	useGameEventsDispatcher({ eventSubscriber, gameStateStore });
	return null;
}
