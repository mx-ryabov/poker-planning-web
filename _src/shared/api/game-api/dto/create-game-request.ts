export interface CreateGameRequest {
	name: string;
	votingSystemId: string;
	creatorName: string;
	isAutoRevealCards?: boolean;
}
