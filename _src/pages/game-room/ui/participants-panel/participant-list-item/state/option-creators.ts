import { GameParticipant, ParticipantRole } from "@/_src/shared/api/game-api";
import { ParticipantMenuOption } from "../model/participant-menu-option";
import { UserRemoveIcon } from "@/_src/shared/ui/components/icon/svg/user-remove.icon";
import {
	checkPermissions,
	RestrictedGameActions,
} from "@/_src/pages/game-room/model/game-role-manager";

abstract class OptionsCreator {
	protected abstract action: RestrictedGameActions;

	constructor(
		protected participantFromList: GameParticipant,
		protected currentParticipantRole: ParticipantRole,
	) {}

	protected abstract getOption(): ParticipantMenuOption;

	create(): ParticipantMenuOption | null {
		if (
			!checkPermissions(
				this.action,
				this.currentParticipantRole,
				this.participantFromList.role,
			)
		)
			return null;
		return this.getOption();
	}
}

export class KickOptionCreator extends OptionsCreator {
	action = "kickParticipant" as RestrictedGameActions;
	getOption(): ParticipantMenuOption {
		return {
			title: "Kick",
			icon: UserRemoveIcon,
			action: () => {
				console.log("Kick", this.participantFromList);
			},
		};
	}
}
