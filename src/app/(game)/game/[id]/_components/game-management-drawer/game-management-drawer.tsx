"use client";
import { Drawer } from "@/src/shared/ui/components/drawer";
import {
	GameManagementTab,
	useGameManagementState,
} from "@/src/app/(game)/game/[id]/_store";
import { DrawerHeader } from "./game-management-drawer-header";
import { DrawerBody } from "./game-management-drawer-body";
import { TicketsPanel } from "../tickets-panel";
import { ParticipantsPanel } from "../participants-panel";
import { SettingsPanel } from "../settings-panel";
import { Activity, Fragment, ReactElement, ReactNode } from "react";
import { IconType } from "@/src/shared/ui/components/icon";

export type GameDrawerPanelHeader = {
	title: ReactNode;
	subTitle?: ReactNode;
	icon: IconType;
	rightSlot?: ReactNode;
};

export type GameDrawerPanel = {
	tab: GameManagementTab;
	header: GameDrawerPanelHeader;
	body: ReactNode;
	wrapper?: ({ children }: { children: ReactElement }) => ReactElement;
};

const PANELS: GameDrawerPanel[] = [
	TicketsPanel,
	ParticipantsPanel,
	SettingsPanel,
];

export function GameManagementDrawer() {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	const isDrawerOpen = activeTab !== null;
	return (
		<Drawer.ModalWithSeparator
			position="end"
			isOpen={isDrawerOpen}
			onOpenChange={() => setActiveTab(null)}
			stateKey="game-manager-drawer"
			minWidth={300}
			maxWidth={500}
			className=""
		>
			<section
				className="w-full h-full"
				data-testid="game-management-drawer-content"
			>
				{PANELS.map((panel) => (
					<Activity
						key={panel.tab}
						mode={panel.tab === activeTab ? "visible" : "hidden"}
					>
						<Panel panel={panel} />
					</Activity>
				))}
			</section>
		</Drawer.ModalWithSeparator>
	);
}

function Panel({ panel }: { panel: GameDrawerPanel }) {
	const Wrapper = panel?.wrapper || Fragment;
	return (
		<Wrapper>
			<div className="flex flex-col gap-5 h-full w-full bg-white">
				{panel.header && <DrawerHeader header={panel.header} />}
				{panel?.body && (
					<DrawerBody
						data-testid={`game-management-panel-${panel.tab}`}
					>
						{panel.body}
					</DrawerBody>
				)}
			</div>
		</Wrapper>
	);
}

