import { GameParticipant, ParticipantRole } from "@/_src/shared/api/game-api";
import { ParticipantMenuOption } from "../model/participant-menu-option";
import { UserRemoveIcon } from "@/_src/shared/ui/components/icon/svg/user-remove.icon";
import { CrownIcon } from "@/_src/shared/ui/components/icon";

abstract class OptionsCreator {
	/**
	 * Key - current participant role
	 * Value - Roles to which the current participant can apply an option action
	 */
	protected abstract applicableToDict: Record<
		ParticipantRole,
		ParticipantRole[]
	>;

	constructor(
		protected participantFromList: GameParticipant,
		protected currentParticipantRole: ParticipantRole,
	) {}

	protected abstract getOption(): ParticipantMenuOption;

	create(): ParticipantMenuOption | null {
		const applicableTo = this.applicableToDict[this.currentParticipantRole];
		if (!applicableTo.includes(this.participantFromList.role)) {
			return null;
		}
		return this.getOption();
	}
}

export class KickOptionCreator extends OptionsCreator {
	applicableToDict = {
		[ParticipantRole.Master]: [
			ParticipantRole.Manager,
			ParticipantRole.VotingMember,
			ParticipantRole.Spectator,
		],
		[ParticipantRole.Manager]: [
			ParticipantRole.VotingMember,
			ParticipantRole.Spectator,
		],
		[ParticipantRole.VotingMember]: [],
		[ParticipantRole.Spectator]: [],
	};
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

export class AppointAsMasterOptionCreator extends OptionsCreator {
	applicableToDict = {
		[ParticipantRole.Master]: [
			// ParticipantRole.Manager,
			// ParticipantRole.VotingMember,
		],
		[ParticipantRole.Manager]: [],
		[ParticipantRole.VotingMember]: [],
		[ParticipantRole.Spectator]: [],
	};
	getOption(): ParticipantMenuOption {
		return {
			title: "Appoint as Game Master",
			icon: CrownIcon,
			action: () => {
				console.log("Appoint as Game Master", this.participantFromList);
			},
		};
	}
}
