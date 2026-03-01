import { GetGameByIdResponse } from "@/src/domain/entities/game";
import {
	GameVotingStatus,
	ParticipantRole,
	GameParticipant,
	GameTicket,
	TicketType,
	GameVotingResult,
	GameVotingResultVote,
} from "@/src/domain/entities/game";
import {
	VotingSystem,
	VotingSystemVote,
} from "@/src/domain/entities/voting-system";

export function generateGame(
	overrideGame: Partial<GetGameByIdResponse> = {},
): GetGameByIdResponse {
	const defaultVotingSystemId = "6a113d25-34c9-4b49-985c-2df6dd67650c";
	const defaultVotingSystem = overrideGame.votingSystem || {
		id: defaultVotingSystemId,
		name: "Fibonacci",
		creator: null,
		votes: [
			{
				id: "bf0d4051-84a7-4162-8f48-580d4e488df2",
				value: "0",
				order: 0,
				suit: "🏖️",
				votingSystemId: defaultVotingSystemId,
			},
			{
				id: "5addfe74-4e6d-4dde-8c1b-01b856a57b2a",
				value: "1",
				order: 1,
				suit: "⚡",
				votingSystemId: defaultVotingSystemId,
			},
			{
				id: "f1f6b021-7f60-4b21-b297-6be2b93f0cb9",
				value: "2",
				order: 2,
				suit: "🚀",
				votingSystemId: defaultVotingSystemId,
			},
			{
				id: "a05dcc39-4781-4407-9255-94d8cc847657",
				value: "3",
				order: 3,
				suit: "🤔",
				votingSystemId: defaultVotingSystemId,
			},
			{
				id: "9875f3f1-cbb0-40ee-b649-de48b706b7ba",
				value: "5",
				order: 4,
				suit: "😬",
				votingSystemId: defaultVotingSystemId,
			},
			{
				id: "8d23dd52-a81e-41b5-a9ac-2df12cd6d667",
				value: "8",
				order: 5,
				suit: "😵",
				votingSystemId: defaultVotingSystemId,
			},
			{
				id: "07746553-c20a-4337-9fea-d37d9a473e78",
				value: "13",
				order: 6,
				suit: "☠️",
				votingSystemId: defaultVotingSystemId,
			},
			{
				id: "2c60634e-02ae-4b06-9894-c4f928d3037b",
				value: "?",
				order: 7,
				suit: "🤡",
				votingSystemId: defaultVotingSystemId,
			},
		],
	};

	return {
		id: "4671d10f-ddc9-45e9-815b-b1becda060a8",
		name: "Test And Test",
		link: "9d9d87f5-4f8b-402d-9f3b-8d886831c19c",
		settings: { isAutoRevealCards: false, autoRevealPeriod: 120 },
		votingProcess: {
			status: GameVotingStatus.Inactive,
			ticket: null,
			startTime: new Date().toString(),
		},
		votingSystem: defaultVotingSystem,
		participants: [
			{
				id: "c5ac2a2f-b1f4-42fd-aa47-02f1f3b1cc5c",
				displayName: "Maxim Ryabov",
				online: true,
				role: ParticipantRole.Master,
				userId: "3cd5bbba-0a58-40fd-904e-db59b41197b0",
				vote: null,
			},
		],
		tickets: [],
		votingResults: [],
		...overrideGame,
	};
}

export function generateParticipant(
	overrideParticipant: Partial<GameParticipant> = {},
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
	overrideTicket: Partial<GameTicket> = {},
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
	overrideResult: Partial<GameVotingResult> = {},
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
	overrideResultVote: Partial<GameVotingResultVote> = {},
): GameVotingResultVote {
	return {
		id: uuidv4(),
		vote: null,
		participantId: "test-participant-id",
		...overrideResultVote,
	};
}

export function generateVotingSystem(
	overrideVotingSystem: Partial<VotingSystem> = {},
): VotingSystem {
	const systemId = overrideVotingSystem.id || uuidv4();
	return {
		id: systemId,
		name: "Test System",
		creator: null,
		votes: [
			{
				id: uuidv4(),
				value: "1",
				order: 1,
				suit: "⚡",
				votingSystemId: systemId,
			},
			{
				id: uuidv4(),
				value: "2",
				order: 2,
				suit: "🚀",
				votingSystemId: systemId,
			},
		],
		...overrideVotingSystem,
	};
}

export function generateVote(
	overrideVote: Partial<VotingSystemVote> = {},
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
