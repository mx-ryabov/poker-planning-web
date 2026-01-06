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
import { GameIntroOnboardingForParticipant } from "../onboardings";

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
			<GameIntroOnboardingForParticipant.Steps.ParticipantsPanelStep>
				<GameIntroOnboardingForParticipant.Steps.TicketsPanelStep>
					<GameIntroOnboardingForParticipant.Steps.SettingsPanelStep>
						<section
							className="flex flex-col gap-5 w-full h-full bg-white"
							data-testid="game-management-drawer-content"
						>
							<DrawerHeader />
							<DrawerBody panels={PANELS} />
						</section>
					</GameIntroOnboardingForParticipant.Steps.SettingsPanelStep>
				</GameIntroOnboardingForParticipant.Steps.TicketsPanelStep>
			</GameIntroOnboardingForParticipant.Steps.ParticipantsPanelStep>
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
