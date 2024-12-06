import { ReactElement, useEffect, useRef } from "react";
import { GameManagementTab, useGameManagementState } from "../../model";

type DrawerBodyProps = {
	panels: Record<
		GameManagementTab,
		{ index: number; component: ReactElement }
	>;
};

export function DrawerBody({ panels }: DrawerBodyProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const activeTab = useGameManagementState((state) => state.activeTab);

	useEffect(() => {
		const containerEl = containerRef.current;
		if (!containerEl || !activeTab) return;

		[...containerEl.children].forEach((panelEl) => {
			if (panelEl instanceof HTMLDivElement) {
				panelEl.style.transform = `translateX(-${panels[activeTab].index}00%)`;
			}
		});
	}, [containerRef, panels, activeTab]);

	if (!activeTab) return null;

	return (
		<section
			className="w-full h-full overflow-hidden relative flex flex-row"
			ref={containerRef}
			data-testid="game-management-drawer-body"
		>
			{Object.entries(panels).map(([tab, panelNode]) => (
				<div
					key={tab}
					data-testid={`game-management-panel-${tab}`}
					aria-hidden={tab !== activeTab}
					className="w-full h-full flex-shrink-0 transition-transform duration-300"
				>
					{panelNode.component}
				</div>
			))}
		</section>
	);
}
