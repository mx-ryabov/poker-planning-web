import { GameEventType } from "./event-type";
import {
	CardsRevealedEvent,
	DisconnectedEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
	ReconnectedEvent,
	ReconnectingEvent,
	TicketAddedEvent,
	TicketDeletedEvent,
	TicketUpdatedEvent,
	VotingFinishedEvent,
	VotingStartedEvent,
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
	[GameEventType.VotingStarted]: VotingStartedEvent;
	[GameEventType.CardsRevealed]: CardsRevealedEvent;
	[GameEventType.VotingFinished]: VotingFinishedEvent;
	[GameEventType.ParticipantVoted]: ParticipantVotedEvent;
};
