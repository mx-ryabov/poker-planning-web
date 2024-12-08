import { GameParticipant, ParticipantRole } from "@/_src/shared/api/game-api";
import { useMemo } from "react";
import { ParticipantMenuOption } from "../model/participant-menu-option";
import {
	KickOptionCreator,
	AppointAsMasterOptionCreator,
} from "./option-creators";

type Props = {
	participantFromList: GameParticipant;
	currentParticipantRole: ParticipantRole;
};

export function useParticipantMenuOptions({
	currentParticipantRole,
	participantFromList,
}: Props) {
	const options: ParticipantMenuOption[] = useMemo(() => {
		const optionCreatorClasses = [
			AppointAsMasterOptionCreator,
			KickOptionCreator,
		];

		return optionCreatorClasses
			.map((CreatorContructor) => {
				const creator = new CreatorContructor(
					participantFromList,
					currentParticipantRole,
				);
				return creator.create();
			})
			.filter((option) => option !== null);
	}, [currentParticipantRole, participantFromList]);

	return options;
}
