export default interface CreateGameResponse {
	id: string;
	name: string;
	link: string;
	settings: {
		isAutoRevealCards: boolean;
	};
	masterToken: string;
}
