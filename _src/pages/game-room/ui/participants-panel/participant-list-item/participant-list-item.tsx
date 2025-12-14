import { GameParticipant } from "@/_src/shared/api/game-api";
import {
	GameParticipantRoleNames,
	selectCurrentParticipant,
	useGameState,
} from "../../../model";
import { Menu } from "@/_src/shared/ui/components/menu";
import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { MoreIcon } from "@/_src/shared/ui/components/icon";
import { Avatar } from "@/_src/shared/ui/components/avatar";
import { useMemo } from "react";
import { useParticipantItemOptions } from "./state/use-participant-item-options";

type ParticipantListItemProps = {
	participant: GameParticipant;
};

export function ParticipantListItem({
	participant: participantFromList,
}: ParticipantListItemProps) {
	const currentParticipant = useGameState(selectCurrentParticipant);

	const isCurrentParticipant = useMemo(
		() => participantFromList.id === currentParticipant.id,
		[participantFromList.id, currentParticipant.id],
	);

	const options = useParticipantItemOptions();

	return (
		<div className="flex flex-row gap-3">
			<Avatar
				altText={participantFromList.displayName}
				className="w-10 h-10 shrink-0"
				online={participantFromList.online}
			/>
			<div className="flex flex-row w-full justify-between">
				<div className="flex flex-col">
					<p>
						{participantFromList.displayName}{" "}
						{isCurrentParticipant && "(You)"}
					</p>
					<span className="text-xs">
						{GameParticipantRoleNames[participantFromList.role]}
					</span>
				</div>
				{options.length > 0 && (
					<Menu>
						<ButtonSquare
							icon={MoreIcon}
							variant="ghost"
							className="shrink-0"
						/>
						<Menu.Content placement="bottom end">
							<Menu.Section title="Options">
								{options.map(({ title, icon, action }) => (
									<Menu.Item onAction={action} key={title}>
										{icon}
										{title}
									</Menu.Item>
								))}
							</Menu.Section>
						</Menu.Content>
					</Menu>
				)}
			</div>
		</div>
	);
}
