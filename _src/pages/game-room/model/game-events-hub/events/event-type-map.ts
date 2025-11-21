import { GameEventType } from "./event-type";
import {
	CardsRevealedEvent,
	CurrentParticipantUpdatedEvent,
	ConnectionEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
	SettingsUpdatedEvent,
	TicketAddedEvent,
	TicketDeletedEvent,
	TicketUpdatedEvent,
	VotingFinishedEvent,
	VotingStartedEvent,
	NewEstimationAppliedEvent,
	VotingCancelledEvent,
} from "./game-events";

export type GameEventTypeMap = {
	[GameEventType.ParticipantJoined]: ParticipantJoinedEvent;
	[GameEventType.ParticipantLeft]: ParticipantLeftEvent;
	[GameEventType.TicketAdded]: TicketAddedEvent;
	[GameEventType.TicketUpdated]: TicketUpdatedEvent;
	[GameEventType.NewEstimationApplied]: NewEstimationAppliedEvent;
	[GameEventType.TicketDeleted]: TicketDeletedEvent;
	[GameEventType.ConnectionEvent]: ConnectionEvent;
	[GameEventType.VotingStarted]: VotingStartedEvent;
	[GameEventType.VotingCancelled]: VotingCancelledEvent;
	[GameEventType.CardsRevealed]: CardsRevealedEvent;
	[GameEventType.VotingFinished]: VotingFinishedEvent;
	[GameEventType.ParticipantVoted]: ParticipantVotedEvent;
	[GameEventType.SettingsUpdated]: SettingsUpdatedEvent;
	[GameEventType.CurrentParticipantUpdated]: CurrentParticipantUpdatedEvent;
};
