import {
	GameParticipant,
	GameTicket,
	GameVotingResult,
	StartVotingResult,
	UpdateGameSettingsResponse,
} from "@/src/domain/entities/game";
import { BaseEvent } from "./base-event";
import { GameEventType } from "./event-type";
import { NewEstimationAppliedResponse } from "@/src/domain/entities/game/models/new-estimation-applied-response";

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

export class NewEstimationAppliedEvent extends BaseEvent<NewEstimationAppliedResponse> {
	constructor(payload: NewEstimationAppliedResponse) {
		super(GameEventType.NewEstimationApplied, payload);
	}
}

export class TicketDeletedEvent extends BaseEvent<string> {
	constructor(payload: string) {
		super(GameEventType.TicketDeleted, payload);
	}
}

type ConnectionPayload =
	| {
			status: "connecting" | "connected";
	  }
	| {
			status: "failed";
			reason: Error;
	  }
	| {
			status: "reconnecting" | "disconnected";
			reason?: Error;
	  };
export class ConnectionEvent extends BaseEvent<ConnectionPayload> {
	constructor(payload: ConnectionPayload) {
		super(GameEventType.ConnectionEvent, payload);
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

export class VotingCancelledEvent extends BaseEvent<void> {
	constructor() {
		super(GameEventType.VotingCancelled);
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
