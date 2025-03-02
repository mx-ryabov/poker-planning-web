import { GameParticipant, GameTicket } from "@/_src/shared/api/game-api";
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
