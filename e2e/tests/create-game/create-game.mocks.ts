import { CreateGameResponse } from "@/_src/shared/api/game-api";
import { VotingSystem } from "@/_src/shared/api/voting-system-api";

export const GET_VOTING_SYSTEMS: VotingSystem[] = [
	{
		id: "6a113d25-34c9-4b49-985c-2df6dd67650c",
		name: "Fibonacci",
		creator: null,
		votes: [
			{
				id: "bf0d4051-84a7-4162-8f48-580d4e488df2",
				order: 0,
				suit: "🏖️",
				value: "0",
				votingSystemId: "6a113d25-34c9-4b49-985c-2df6dd67650c",
			},
		],
	},
	{
		id: "6a113d25-34c9-4b49-985c-2df6dd67650b",
		name: "T-shirts",
		creator: null,
		votes: [
			{
				id: "bf0d4051-84a7-4162-8f48-580d4e488df3",
				order: 0,
				suit: "🏖️",
				value: "XS",
				votingSystemId: "6a113d25-34c9-4b49-985c-2df6dd67650b",
			},
		],
	},
];

export const POST_GAMES: CreateGameResponse = {
	id: "6a113d25-34c9-4b49-905b-2df6dd67650b",
	name: "Team Planning",
	link: "",
	settings: {
		isAutoRevealCards: true,
	},
	masterToken: "",
};
