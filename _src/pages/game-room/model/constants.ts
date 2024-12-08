import { ParticipantRole } from "@/_src/shared/api";

export const GameParticipantRoleNames: Record<ParticipantRole, string> = {
	[ParticipantRole.Manager]: "Game Manager",
	[ParticipantRole.Master]: "Game Master",
	[ParticipantRole.VotingMember]: "Voting Memeber",
	[ParticipantRole.Spectator]: "Spectator",
};

export const RoleLevels: Record<ParticipantRole, number> = {
	[ParticipantRole.Master]: 3,
	[ParticipantRole.Manager]: 2,
	[ParticipantRole.VotingMember]: 1,
	[ParticipantRole.Spectator]: 0,
};
