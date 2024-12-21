import { GameEventType } from "./event-type";
import { ParticipantJoinedEvent, ParticipantLeftEvent } from "./game-events";

export type GameEventTypeMap = {
	[GameEventType.ParticipantJoined]: ParticipantJoinedEvent;
	[GameEventType.ParticipantLeft]: ParticipantLeftEvent;
};
