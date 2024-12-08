import { GameParticipant } from "@/_src/shared/api";
import { MASTER_PARTICIPANT } from "@/_src/shared/mocks";

export const CURRENT_PARTICIPANT: GameParticipant = {
	...MASTER_PARTICIPANT,
	displayName: "Current Participant",
};
