import { GameEventType, GameEventTypeMap } from "../events";

export type GameEventListenerCallback<TPayload> = (evt: TPayload) => void;
export type EventSubscriber = <TType extends GameEventType>(
	eventType: TType,
	handler: GameEventListenerCallback<GameEventTypeMap[TType]>,
	// eslint-disable-next-line no-undef
	options?: AddEventListenerOptions | boolean,
) => () => void;

export type GameEventListener = {
	add<TType extends GameEventType>(
		type: TType,
		callback: GameEventListenerCallback<GameEventTypeMap[TType]>,
		// eslint-disable-next-line no-undef
		options?: AddEventListenerOptions | boolean,
	): void;
	remove<TType extends GameEventType>(
		type: TType,
		callback: GameEventListenerCallback<GameEventTypeMap[TType]>,
		// eslint-disable-next-line no-undef
		options?: EventListenerOptions | boolean,
	): void;
};
