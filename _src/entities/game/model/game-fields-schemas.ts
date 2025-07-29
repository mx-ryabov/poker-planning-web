import { TicketType } from "@/_src/shared/api";
import { StringHelper } from "@/_src/shared/lib";
import { z } from "zod";

/* Game */
const name = (minSymbMsg: string, maxSymbMsg: string) =>
	z
		.string()
		.min(1, minSymbMsg)
		.max(50, maxSymbMsg)
		.transform((val) => StringHelper.cleanUpString(val));

const votingSystemId = (requiredMsg: string) =>
	z
		.string({
			required_error: requiredMsg,
		})
		.uuid();

/* Game Settings */
const isAutoRevealCards = () => z.boolean().optional();
const autoRevealPeriod = (minSymbMsg: string, intMsg: string) =>
	z.number().min(1, minSymbMsg).int(intMsg);

/* Participant */
const participantName = (minSymbMsg: string, maxSymbMsg: string) =>
	z
		.string()
		.min(1, minSymbMsg)
		.max(50, maxSymbMsg)
		.transform((val) =>
			StringHelper.cleanUpString(val, { onlyWords: true }),
		);

/* Ticket */
const ticketTitle = (minSymbMsg: string, maxSymbMsg: string) =>
	z.string().min(1, minSymbMsg).max(255, maxSymbMsg);
const ticketDescription = () => z.string().optional();
const ticketEstimation = (maxSymbMsg: string) =>
	z.string().max(10, maxSymbMsg).nullable();
const ticketType = (requiredMsg: string) =>
	z.nativeEnum(TicketType, {
		required_error: requiredMsg,
	});

export const GameSchemaBuildersMap = {
	name,
	votingSystemId,
	settings: {
		isAutoRevealCards,
		autoRevealPeriod,
	},
	participant: {
		name: participantName,
	},
	ticket: {
		title: ticketTitle,
		description: ticketDescription,
		estimation: ticketEstimation,
		type: ticketType,
	},
};
