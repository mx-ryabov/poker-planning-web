import { GameParticipant } from "@/_src/shared/api/game-api";
import { BaseEvent } from "./base-event";

export class ParticipantJoinedEvent extends BaseEvent<GameParticipant> {
	constructor(payload: GameParticipant) {
		super("ParticipantJoined", payload);
	}
}

export class ParticipantLeftEvent extends BaseEvent<{ userId: string }> {
	constructor(payload: { userId: string }) {
		super("ParticipantLeft", payload);
	}
}
