import { CreateGameFormSteps } from "./types";

export function getIdFromAnchor(anchor: CreateGameFormSteps) {
	return anchor.slice(1);
}
