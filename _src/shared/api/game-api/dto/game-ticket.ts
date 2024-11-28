export type GameTicket = {
	id: string;
	title: string;
	description: string;
	link?: string;
	type?: TicketType;
	identifier?: string;
	estimation?: string;
};

export enum TicketType {
	Story,
	Task,
	Bug,
}