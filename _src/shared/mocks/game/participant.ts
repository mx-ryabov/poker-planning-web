import { GameParticipant, ParticipantRole } from "@/_src/shared/api/game-api";

export const MASTER_PARTICIPANT: GameParticipant = {
	id: "c5ac2a2f-b1f4-42fd-aa47-02f1f3b1cc5a",
	displayName: "Test Master",
	role: ParticipantRole.Master,
	online: false,
	userId: "3cd5bbba-0a58-40fd-904e-db59b41197b1",
};

export const MANAGER_PARTICIPANT: GameParticipant = {
	id: "c5ac2a2f-b1f4-42fd-aa47-02f1f3b1cc5b",
	displayName: "Test Manager",
	role: ParticipantRole.Manager,
	online: false,
	userId: "3cd5bbba-0a58-40fd-904e-db59b41197b2",
};

export const VOTING_MEMBER_PARTICIPANT: GameParticipant = {
	id: "c5ac2a2f-b1f4-42fd-aa47-02f1f3b1cc5c",
	displayName: "Test VotingMember",
	role: ParticipantRole.VotingMember,
	online: false,
	userId: "3cd5bbba-0a58-40fd-904e-db59b41197b3",
};

export const SPECTATOR_PARTICIPANT: GameParticipant = {
	id: "c5ac2a2f-b1f4-42fd-aa47-02f1f3b1cc5d",
	displayName: "Test Spectator",
	role: ParticipantRole.Spectator,
	online: false,
	userId: "3cd5bbba-0a58-40fd-904e-db59b41197b4",
};
