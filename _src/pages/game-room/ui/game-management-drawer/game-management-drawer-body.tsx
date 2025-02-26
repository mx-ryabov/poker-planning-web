import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { GameManagementTab, useGameManagementState } from "../../model";

type DrawerBodyProps = {
	panels: Record<
		GameManagementTab,
		{ index: number; component: ReactElement }
	>;
};

export function DrawerBody({ panels }: DrawerBodyProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<section
			className="w-full h-full overflow-hidden relative flex flex-row px-6 pb-6"
			ref={containerRef}
			data-testid="game-management-drawer-body"
		>
			{Object.entries(panels).map(([tab, panelNode]) => (
				<Slide key={tab} tab={tab} index={panelNode.index}>
					{panelNode.component}
				</Slide>
			))}
		</section>
	);
}

type SlideProps = {
	tab: string;
	index: number;
	children: ReactNode;
};

function Slide({ children, tab, index }: SlideProps) {
	const slideRef = useRef<HTMLDivElement | null>(null);
	const activeTab = useGameManagementState((state) => state.activeTab);

	useEffect(() => {
		const slideEl = slideRef.current;
		if (!slideEl || !activeTab) return;

		let translateValue = -100 * index;
		if (tab !== activeTab) {
			translateValue += 100;
		}
		slideEl.style.transform = `translateX(${translateValue}%)`;
	}, [slideRef, activeTab, index, tab]);

	return (
		<div
			ref={slideRef}
			data-testid={`game-management-panel-${tab}`}
			aria-hidden={tab !== activeTab}
			className="w-full h-full shrink-0 transition-transform duration-300"
			style={{ visibility: activeTab === tab ? "visible" : "hidden" }}
		>
			{children}
		</div>
	);
}
