export const RestrictedGameActions = {
	KickParticipant: "KickParticipant",
	StartVoting: "StartVoting",
	EditTicket: "EditTicket",
	DeleteTicket: "DeleteTicket",
} as const;

export type RestrictedGameActionsType =
	(typeof RestrictedGameActions)[keyof typeof RestrictedGameActions];
