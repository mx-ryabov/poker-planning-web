import {
	IconType,
	ListIcon,
	PeopleIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { SlidingSelector } from "@/_src/shared/ui/components/sliding-selector";
import { GameManagementTab, useGameManagementState } from "../../model";

type Props = {
	className?: string;
};

const TAB_BUTTON_OPTIONS: Record<
	GameManagementTab,
	{ icon: IconType; index: number }
> = {
	[GameManagementTab.TaskList]: {
		icon: ListIcon,
		index: 0,
	},
	[GameManagementTab.ParticipantList]: {
		icon: PeopleIcon,
		index: 1,
	},
	[GameManagementTab.Settings]: {
		icon: SettingsIcon,
		index: 2,
	},
};

export function GameManagementBar({ className }: Props) {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	return (
		<div className={className}>
			<SlidingSelector
				containerClassName={
					"flex flex-row gap-1 p-1 rounded-xl bg-white shadow-primary-500 drop-shadow-lg"
				}
				activeIndex={
					activeTab ? TAB_BUTTON_OPTIONS[activeTab].index : null
				}
				selectorClassName="rounded-lg bg-primary-200 mix-blend-multiply"
				onSelectionReset={() => setActiveTab(null)}
			>
				{Object.entries(TAB_BUTTON_OPTIONS).map(
					([tabType, tabOptions], ind) => (
						<ButtonSquare
							key={ind}
							icon={tabOptions.icon}
							variant="ghost"
							size="small"
							className="bg-opacity-0 hover:bg-primary-100 hover:text-primary-500 data-[sliding-selector-element-active=true]:text-primary-500"
							onPress={setActiveTab.bind(
								setActiveTab,
								tabType as GameManagementTab,
							)}
						/>
					),
				)}
			</SlidingSelector>
		</div>
	);
}
