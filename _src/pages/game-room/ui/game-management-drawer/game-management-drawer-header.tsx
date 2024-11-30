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
				true: ["translate-y-0 opacity-1"],
				false: ["translate-y-11 opacity-0"],
			},
		},
	},
);

export function DrawerHeader() {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const { headers } = useDrawerHeaderState();

	return (
		<header className="h-11">
			<div className="w-full h-full relative flex flex-col overflow-hidden">
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
							color: Color.Neutral700,
						})}
						<div className="flex flex-col justify-center">
							<Drawer.Heading>{header.title}</Drawer.Heading>
							{header?.subTitle && (
								<p className="text-neutral-300 text-xs">
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

function useDrawerHeaderState() {
	const participantsCount = useGameState(selectParticipantsCount);
	const ticketsCount = useGameState(selectTicketsCount);

	const headers = useMemo(
		() => [
			{
				title: "Participants",
				subTitle: `${participantsCount} online`,
				icon: PeopleIcon,
				tab: GameManagementTab.ParticipantList,
			},
			{
				title: "Issues",
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
		[participantsCount, ticketsCount],
	);

	return { headers };
}
