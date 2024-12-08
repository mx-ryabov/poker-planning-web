import { GameLinkClipboardCopier } from "./game-link-clipboard-copier";
import { ParticipantList } from "./participant-list";
import { ParticipantListItem } from "./participant-list-item";

export function ParticipantsPanel() {
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
