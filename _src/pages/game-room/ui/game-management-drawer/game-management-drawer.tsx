"use client";
import { Drawer } from "@/_src/shared/ui/components/drawer";
import { GameManagementTab, useGameManagementState } from "../../model";
import { DrawerHeader } from "./game-management-drawer-header";
import { DrawerBody } from "./game-management-drawer-body";
import { TicketsPanel } from "../tickets-panel";
import { ParticipantsPanel } from "../participants-panel";
import { SettingsPanel } from "../settings-panel";

export function GameManagementDrawer() {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	return (
		<Drawer.ModalWithSeparator
			position="end"
			isOpen={activeTab !== null}
			onOpenChange={() => setActiveTab(null)}
			stateKey="game-manager-drawer"
			minWidth={300}
			maxWidth={500}
			className=""
		>
			<section
				className="flex flex-col gap-5 w-full h-full"
				data-testid="game-management-drawer-content"
			>
				<DrawerHeader />
				<DrawerBody panels={PANELS} />
			</section>
		</Drawer.ModalWithSeparator>
	);
}

const PANELS = {
	[GameManagementTab.TaskList]: {
		index: 0,
		component: <TicketsPanel />,
	},
	[GameManagementTab.ParticipantList]: {
		index: 1,
		component: <ParticipantsPanel />,
	},
	[GameManagementTab.Settings]: {
		index: 2,
		component: <SettingsPanel />,
	},
};
