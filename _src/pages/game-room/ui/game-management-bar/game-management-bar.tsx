"use client";
import {
	IconType,
	ListIcon,
	PeopleIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { SlidingSelector } from "@/_src/shared/ui/components/sliding-selector";
import { GameManagementTab, useGameManagementState } from "../../model";
import { Tooltip } from "@/_src/shared/ui/components/tooltip";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useState } from "react";

type Props = {
	className?: string;
};

export function GameManagementBar({ className }: Props) {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const liveStatus = useGameManagementState((state) => state.liveStatus);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	const [barState, setBarState] = useState<"error" | "success" | "neutral">(
		"neutral",
	);
	useEffect(() => {
		if (liveStatus.state === "connected") {
			setBarState((prevState) =>
				prevState === "error" ? "success" : "neutral",
			);
			setTimeout(() => {
				setBarState("neutral");
			}, 1000);
		}
		if (
			liveStatus.state === "disconnected" ||
			liveStatus.state === "reconnecting"
		) {
			setBarState("error");
		}
	}, [liveStatus]);

	const onPanelSelected = useCallback(
		(tabType: GameManagementTab) => () => {
			setActiveTab(activeTab !== tabType ? tabType : null);
		},
		[activeTab, setActiveTab],
	);

	return (
		<div className={className} data-testid="game-management-bar">
			<SlidingSelector
				containerClassName={containerStyle({
					state: barState,
				})}
				activeIndex={
					activeTab ? TAB_BUTTON_OPTIONS[activeTab].index : null
				}
				selectorClassName="rounded-lg bg-primary-100 -z-10"
				onSelectionReset={() => setActiveTab(null)}
			>
				{Object.entries(TAB_BUTTON_OPTIONS).map(
					([tabType, tabOptions], ind) => (
						<Tooltip key={ind} delay={750}>
							<ButtonSquare
								icon={tabOptions.icon}
								variant="ghost"
								size="small"
								aria-label={tabType}
								className="group-data-[sliding-selector-element-active=true]:text-primary-500 group-data-[sliding-selector-element-active=true]:hover:text-primary-400 bg-white/0 text-neutral-900 hover:text-neutral-600"
								onPress={onPanelSelected(
									tabType as GameManagementTab,
								)}
							/>
							<Tooltip.Content>
								{tabOptions.tooltipText}
							</Tooltip.Content>
						</Tooltip>
					),
				)}
			</SlidingSelector>
			{barState === "error" && (
				<span className="absolute -top-1 -right-1 flex h-4 w-4">
					<span className="bg-error-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
					<span className="border-error-500 text-error-500 relative inline-flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white text-center text-[9px] font-black">
						!
					</span>
				</span>
			)}
			{(barState === "error" || barState === "success") && (
				<span
					className={liveStatusMessageStyle({
						state: barState,
					})}
				>
					{liveStatus.state === "reconnecting" && "Reconnecting..."}
					{liveStatus.state === "disconnected" &&
						"Disconnected. Please check you network."}
					{liveStatus.state === "connected" && "You're live again!"}
				</span>
			)}
		</div>
	);
}

const TAB_BUTTON_OPTIONS: Record<
	GameManagementTab,
	{ icon: IconType; index: number; tooltipText: string }
> = {
	[GameManagementTab.TaskList]: {
		icon: ListIcon,
		tooltipText: "Issues",
		index: 0,
	},
	[GameManagementTab.ParticipantList]: {
		icon: PeopleIcon,
		tooltipText: "Participants",
		index: 1,
	},
	[GameManagementTab.Settings]: {
		icon: SettingsIcon,
		tooltipText: "Settings",
		index: 2,
	},
};

const containerStyle = cva(
	"flex flex-row gap-1 p-1 rounded-xl bg-white drop-shadow-lg transition-all",
	{
		variants: {
			state: {
				error: ["outline outline-2 outline-error-500"],
				success: ["outline outline-2 outline-success-500"],
				neutral: [],
			},
		},
	},
);

const liveStatusMessageStyle = cva(
	"absolute left-1/2 top-[calc(100%_+_8px)] -translate-x-1/2 text-xs w-full text-center",
	{
		variants: {
			state: {
				success: ["text-success-500"],
				error: ["text-error-500"],
			},
		},
	},
);
