import { VotingSystem, VotingSystemVote } from "@/_src/shared/api";
import {
	GameParticipant,
	GameTicket,
	GameVotingResult,
	GameVotingResultVote,
	GetGameByIdResponse,
	ParticipantRole,
	TicketType,
} from "@/_src/shared/api/game-api";
import { NEWLY_CREATED_GAME } from "@/_src/shared/mocks/game";

export function generateGame(
	overrideGame: Partial<GetGameByIdResponse>,
): GetGameByIdResponse {
	return {
		...NEWLY_CREATED_GAME,
		...overrideGame,
	};
}

export function generateParticipant(
	overrideParticipant: Partial<GameParticipant>,
): GameParticipant {
	return {
		id: uuidv4(),
		online: false,
		displayName: "",
		userId: uuidv4(),
		role: ParticipantRole.VotingMember,
		...overrideParticipant,
		vote: overrideParticipant.vote || null,
	};
}

export function generateTicket(
	overrideTicket: Partial<GameTicket>,
): GameTicket {
	return {
		id: uuidv4(),
		title: "New Ticket",
		type: TicketType.Story,
		description: "",
		identifier: "TEST-1",
		estimation: null,
		...overrideTicket,
	};
}

export function generateVotingResult(
	overrideResult: Partial<GameVotingResult>,
): GameVotingResult {
	return {
		id: uuidv4(),
		ticketId: null,
		createdAt: "date-time",
		votes: [],
		...overrideResult,
	};
}

export function generateVotingResultVote(
	overrideResultVote: Partial<GameVotingResultVote>,
): GameVotingResultVote {
	return {
		id: uuidv4(),
		vote: null,
		participantId: "test-participant-id",
		...overrideResultVote,
	};
}

export function generateVotingSystem(
	overrideVotingSystem: Partial<VotingSystem>,
): VotingSystem {
	return {
		id: uuidv4(),
		name: "Test System",
		creator: null,
		votes: [
			{
				id: uuidv4(),
				value: "1",
				order: 1,
				suit: "⚡",
				votingSystemId: overrideVotingSystem.id || uuidv4(),
			},
			{
				id: uuidv4(),
				value: "2",
				order: 2,
				suit: "🚀",
				votingSystemId: overrideVotingSystem.id || uuidv4(),
			},
		],
		...overrideVotingSystem,
	};
}

export function generateVote(
	overrideVote: Partial<VotingSystemVote>,
): VotingSystemVote {
	return {
		id: uuidv4(),
		value: "1",
		order: 1,
		suit: "⚡",
		votingSystemId: uuidv4(),
		...overrideVote,
	};
}

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			const r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		},
	);
}
