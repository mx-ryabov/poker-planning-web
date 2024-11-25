"use client";

import { useGameEventsHub } from "@/_src/entities/game-room/game-events-hub";
import { GameManagementTab } from "@/_src/entities/game-room/game-management";
import { GameManagementBar } from "@/_src/features/game-room/game-management-bar";
import { GameManagementDrawer } from "@/_src/features/game-room/game-management-drawer";
import { ParticipantsPanel } from "@/_src/features/game-room/participants-panel";
import { SettingsPanel } from "@/_src/features/game-room/settings-panel";
import { TasksPanel } from "@/_src/features/game-room/tasks-panel";
import { UserBar } from "@/_src/features/game-room/user-bar";
import { GetGameByIdResponse } from "@/_src/shared/api/game-api/dto/get-game-by-id-response";
import { ListIcon } from "@/_src/shared/ui/components/icon/svg/list.icon";
import { Logo } from "@/_src/shared/ui/components/logo";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";

interface Props {
	token: string;
	gameId: string;
	game: GetGameByIdResponse;
}

export function GameRoomPage({ token, gameId }: Props) {
	useGameEventsHub({ token, gameId });

	return (
		<div className="flex flex-row h-screen w-full overflow-hidden">
			<div className="flex flex-col w-full">
				<header className="w-full flex flex-row justify-between p-6 relative">
					<NextLink href="/">
						<Logo />
					</NextLink>
					<GameManagementBar className="absolute left-1/2 -translate-x-1/2" />
					<UserBar />
				</header>
				<main></main>
			</div>

			<GameManagementDrawer>
				<GameManagementDrawer.Header
					icon={ListIcon}
					title="Issues"
					subTitle="15 in the list"
				/>
				<GameManagementDrawer.Body
					panels={{
						[GameManagementTab.TaskList]: <TasksPanel />,
						[GameManagementTab.ParticipantList]: (
							<ParticipantsPanel />
						),
						[GameManagementTab.Settings]: <SettingsPanel />,
					}}
				/>
			</GameManagementDrawer>
		</div>
	);
}
