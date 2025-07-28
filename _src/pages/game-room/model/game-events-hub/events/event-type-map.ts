import { GameEventType } from "./event-type";
import {
	CardsRevealedEvent,
	CurrentParticipantUpdatedEvent,
	DisconnectedEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
	ReconnectedEvent,
	ReconnectingEvent,
	SettingsUpdatedEvent,
	TicketAddedEvent,
	TicketDeletedEvent,
	TicketUpdatedEvent,
	VotingFinishedEvent,
	VotingStartedEvent,
	NewEstimationAppliedEvent,
} from "./game-events";

export type GameEventTypeMap = {
	[GameEventType.ParticipantJoined]: ParticipantJoinedEvent;
	[GameEventType.ParticipantLeft]: ParticipantLeftEvent;
	[GameEventType.TicketAdded]: TicketAddedEvent;
	[GameEventType.TicketUpdated]: TicketUpdatedEvent;
	[GameEventType.NewEstimationApplied]: NewEstimationAppliedEvent;
	[GameEventType.TicketDeleted]: TicketDeletedEvent;
	[GameEventType.Reconnecting]: ReconnectingEvent;
	[GameEventType.Reconnected]: ReconnectedEvent;
	[GameEventType.Disconnected]: DisconnectedEvent;
	[GameEventType.VotingStarted]: VotingStartedEvent;
	[GameEventType.CardsRevealed]: CardsRevealedEvent;
	[GameEventType.VotingFinished]: VotingFinishedEvent;
	[GameEventType.ParticipantVoted]: ParticipantVotedEvent;
	[GameEventType.SettingsUpdated]: SettingsUpdatedEvent;
	[GameEventType.CurrentParticipantUpdated]: CurrentParticipantUpdatedEvent;
};
