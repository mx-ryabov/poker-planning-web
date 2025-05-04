export const RestrictedGameActions = {
	KickParticipant: "KickParticipant",
	ChangeVoting: "ChangeVoting",
	EditTicket: "EditTicket",
	DeleteTicket: "DeleteTicket",
	CreateTicket: "CreateTicket",
} as const;

export type RestrictedGameActionsType =
	(typeof RestrictedGameActions)[keyof typeof RestrictedGameActions];
