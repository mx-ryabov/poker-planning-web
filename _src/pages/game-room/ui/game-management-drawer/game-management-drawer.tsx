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
		<Drawer.Modal
			type="inline"
			position="end"
			portal="in-same-place"
			isOpen={activeTab !== null}
			onOpenChange={() => setActiveTab(null)}
			withSeparator
			stateKey="game-manager-drawer"
			className="min-w-[300px] max-w-[500px]"
		>
			<section
				className="flex flex-col gap-5 w-full h-full"
				data-testid="game-management-drawer-content"
			>
				<DrawerHeader />
				<DrawerBody panels={PANELS} />
			</section>
		</Drawer.Modal>
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
