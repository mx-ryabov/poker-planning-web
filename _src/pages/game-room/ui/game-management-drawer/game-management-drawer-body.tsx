import { ReactElement, useMemo } from "react";
import { GameManagementTab, useGameManagementState } from "../../model";
import { twMerge } from "tailwind-merge";

type DrawerBodyProps = {
	panels: Record<
		GameManagementTab,
		{ index: number; component: ReactElement }
	>;
};

export function DrawerBody({ panels }: DrawerBodyProps) {
	const activeTab = useGameManagementState((state) => state.activeTab);

	const translateStyle = useMemo(() => {
		const activeInd = activeTab ? panels[activeTab].index : 0;
		return `-translate-x-[${activeInd}00%]`;
	}, [panels, activeTab]);

	if (!activeTab) return null;

	return (
		<section className="w-full h-full overflow-hidden relative">
			<div className="flex flex-row absolute h-full w-full">
				{Object.entries(panels).map(([tab, panelNode]) => (
					<div
						key={tab}
						className={twMerge(
							"w-full h-full flex-shrink-0 transition-transform duration-300",
							translateStyle,
						)}
					>
						{panelNode.component}
					</div>
				))}
			</div>
		</section>
	);
}
