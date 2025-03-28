import { GameEventType } from "./event-type";
import {
	DisconnectedEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ReconnectedEvent,
	ReconnectingEvent,
	TicketAddedEvent,
	TicketDeletedEvent,
	TicketUpdatedEvent,
} from "./game-events";

export type GameEventTypeMap = {
	[GameEventType.ParticipantJoined]: ParticipantJoinedEvent;
	[GameEventType.ParticipantLeft]: ParticipantLeftEvent;
	[GameEventType.TicketAdded]: TicketAddedEvent;
	[GameEventType.TicketUpdated]: TicketUpdatedEvent;
	[GameEventType.TicketDeleted]: TicketDeletedEvent;
	[GameEventType.Reconnecting]: ReconnectingEvent;
	[GameEventType.Reconnected]: ReconnectedEvent;
	[GameEventType.Disconnected]: DisconnectedEvent;
};
