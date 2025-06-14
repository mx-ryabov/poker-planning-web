import {
	GameParticipant,
	GameTicket,
	GameVotingResult,
	StartVotingResult,
	UpdateGameSettingsResponse,
} from "@/_src/shared/api/game-api";
import { BaseEvent } from "./base-event";
import { GameEventType } from "./event-type";

export class ParticipantJoinedEvent extends BaseEvent<GameParticipant> {
	constructor(payload: GameParticipant) {
		super(GameEventType.ParticipantJoined, payload);
	}
}

export class ParticipantLeftEvent extends BaseEvent<{ userId: string }> {
	constructor(payload: { userId: string }) {
		super(GameEventType.ParticipantLeft, payload);
	}
}

export class TicketAddedEvent extends BaseEvent<GameTicket> {
	constructor(payload: GameTicket) {
		super(GameEventType.TicketAdded, payload);
	}
}

export class TicketUpdatedEvent extends BaseEvent<GameTicket> {
	constructor(payload: GameTicket) {
		super(GameEventType.TicketUpdated, payload);
	}
}

export class TicketDeletedEvent extends BaseEvent<string> {
	constructor(payload: string) {
		super(GameEventType.TicketDeleted, payload);
	}
}

export class ReconnectingEvent extends BaseEvent<Error | undefined> {
	constructor(payload: Error | undefined) {
		super(GameEventType.Reconnecting, payload);
	}
}

export class ReconnectedEvent extends BaseEvent<void> {
	constructor() {
		super(GameEventType.Reconnected);
	}
}

export class DisconnectedEvent extends BaseEvent<Error | undefined> {
	constructor(payload: Error | undefined) {
		super(GameEventType.Disconnected, payload);
	}
}

type VotingStartedEventPayload = {
	ticketId: string | null;
} & StartVotingResult;
export class VotingStartedEvent extends BaseEvent<VotingStartedEventPayload> {
	constructor(payload: VotingStartedEventPayload) {
		super(GameEventType.VotingStarted, payload);
	}
}

export class CardsRevealedEvent extends BaseEvent<void> {
	constructor() {
		super(GameEventType.CardsRevealed);
	}
}

export class VotingFinishedEvent extends BaseEvent<GameVotingResult> {
	constructor(votingResult: GameVotingResult) {
		super(GameEventType.VotingFinished, votingResult);
	}
}

export class ParticipantVotedEvent extends BaseEvent<{
	participantId: string;
	voteId: string | null;
}> {
	constructor(payload: { participantId: string; voteId: string | null }) {
		super(GameEventType.ParticipantVoted, payload);
	}
}

export class SettingsUpdatedEvent extends BaseEvent<UpdateGameSettingsResponse> {
	constructor(newSettings: UpdateGameSettingsResponse) {
		super(GameEventType.SettingsUpdated, newSettings);
	}
}

export class CurrentParticipantUpdatedEvent extends BaseEvent<GameParticipant> {
	constructor(updatedparticipant: GameParticipant) {
		super(GameEventType.CurrentParticipantUpdated, updatedparticipant);
	}
}
