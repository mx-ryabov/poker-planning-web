import { useCallback, useEffect, useMemo, useRef } from "react";
import { GameEventType, GameEventTypeMap } from "../events";
import {
	GameEventListener,
	GameEventListenerCallback,
} from "./use-game-events-hub.types";
import { GameHubManager } from "./game-connection-manager";

type Props = {
	gameId: string;
	accessTokenFactory: () => Promise<string>;
};

export function useGameEventsHub({ gameId, accessTokenFactory }: Props) {
	const hubManagerRef = useRef(
		GameHubManager.getInstance({ gameId, accessTokenFactory }),
	);

	useEffect(() => {
		const hubManager = hubManagerRef.current;
		hubManager.connect();
		return () => {
			hubManager.disconnect();
		};
	}, [hubManagerRef]);

	const gameEventTarget = useMemo(
		() => hubManagerRef.current.eventEmitter,
		[hubManagerRef],
	);

	const eventSubscriber = useCallback(
		<TType extends GameEventType>(
			eventType: TType,
			handler: GameEventListenerCallback<GameEventTypeMap[TType]>,
			 
			options?: AddEventListenerOptions | boolean,
		) => {
			(gameEventTarget.addEventListener as GameEventListener["add"])(
				eventType,
				handler,
				options,
			);

			return () => {
				(
					gameEventTarget.removeEventListener as GameEventListener["remove"]
				)(eventType, handler, options);
			};
		},
		[gameEventTarget],
	);

	return eventSubscriber;
}
