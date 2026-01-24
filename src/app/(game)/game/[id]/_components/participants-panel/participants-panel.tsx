import { PeopleIcon } from "@/src/shared/ui/components/icon";
import { GameLinkClipboardCopier } from "./game-link-clipboard-copier";
import { ParticipantList } from "./participant-list";
import { ParticipantListItem } from "./participant-list-item";
import {
	GameManagementTab,
	selectParticipantsCount,
	selectParticipantsOnlineCount,
	useGameState,
} from "../../_store";
import { GameDrawerPanel } from "../game-management-drawer";
import { GameIntroOnboardingForParticipant } from "../onboardings";

function ParticipantsPanelBody() {
	return (
		<div className="flex flex-col gap-6 h-full">
			<GameLinkClipboardCopier />
			<ParticipantList>
				{(participant) => (
					<ParticipantListItem
						key={participant.id}
						participant={participant}
					/>
				)}
			</ParticipantList>
		</div>
	);
}

function ParticipantsPanelSubTitle() {
	const participantsCount = useGameState(selectParticipantsCount);
	const participantsOnlineCount = useGameState(selectParticipantsOnlineCount);
	return `${participantsCount} in the list. ${participantsOnlineCount} online`;
}

export const ParticipantsPanel: GameDrawerPanel = {
	tab: GameManagementTab.ParticipantList,
	header: {
		title: "Participants",
		subTitle: <ParticipantsPanelSubTitle />,
		icon: PeopleIcon,
	},
	body: <ParticipantsPanelBody />,
	wrapper: ({ children }) => (
		<GameIntroOnboardingForParticipant.Steps.ParticipantsPanelStep>
			{children}
		</GameIntroOnboardingForParticipant.Steps.ParticipantsPanelStep>
	),
};
