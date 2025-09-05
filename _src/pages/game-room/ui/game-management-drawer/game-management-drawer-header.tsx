import { Color } from "@/_src/shared/ui/colors";
import { Drawer } from "@/_src/shared/ui/components/drawer";
import {
	ListIcon,
	PeopleIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import {
	GameManagementTab,
	selectParticipantsCount,
	selectParticipantsOnlineCount,
	selectTicketsCount,
	useGameManagementState,
	useGameState,
} from "../../model";
import { useMemo } from "react";
import { cva } from "class-variance-authority";

const headerStyles = cva(
	[
		"absolute top-0 flex flex-row gap-1 items-center transition-all duration-300",
	],
	{
		variants: {
			active: {
				true: ["translate-y-0 opacity-100"],
				false: ["translate-y-11 opacity-0"],
			},
		},
	},
);

export function DrawerHeader() {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const participantsCount = useGameState(selectParticipantsCount);
	const participantsOnlineCount = useGameState(selectParticipantsOnlineCount);
	const ticketsCount = useGameState(selectTicketsCount);

	const headers = useMemo(
		() => [
			{
				title: "Participants",
				subTitle: `${participantsCount} in the list. ${participantsOnlineCount} online`,
				icon: PeopleIcon,
				tab: GameManagementTab.ParticipantList,
			},
			{
				title: "Tickets",
				subTitle: `${ticketsCount} in the list`,
				icon: ListIcon,
				tab: GameManagementTab.TaskList,
			},
			{
				title: "Settings",
				icon: SettingsIcon,
				tab: GameManagementTab.Settings,
			},
		],
		[participantsCount, ticketsCount, participantsOnlineCount],
	);

	return (
		<header
			className="mx-6 mt-6 h-12"
			data-testid="game-management-drawer-header"
		>
			<div className="relative flex h-full w-full flex-col overflow-hidden">
				{headers.map((header) => (
					<div
						key={header.tab}
						className={headerStyles({
							active: header.tab === activeTab,
						})}
						aria-hidden={header.tab !== activeTab}
					>
						{header.icon({
							size: 42,
							thikness: "light",
							color: Color.Neutral900,
						})}
						<div className="flex flex-col justify-center">
							<Drawer.Heading>{header.title}</Drawer.Heading>
							{header?.subTitle && (
								<p className="text-xs text-neutral-700">
									{header?.subTitle}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</header>
	);
}
