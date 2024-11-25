import {
	GameManagementTab,
	useGameManagementState,
} from "@/_src/entities/game-room/game-management";
import { Color } from "@/_src/shared/ui/colors";
import { Drawer } from "@/_src/shared/ui/components/drawer";
import { IconType } from "@/_src/shared/ui/components/icon/icon-builder";
import { ReactElement, ReactNode } from "react";

type DrawerContainerProps = {
	children: ReactNode;
};

function DrawerContainer({ children }: DrawerContainerProps) {
	const state = useGameManagementState();

	return (
		<Drawer.Modal
			type="inline"
			position="end"
			portal="in-same-place"
			isOpen={state.activeTab !== null}
			onOpenChange={() => state.setActiveTab(null)}
			withSeparator
			stateKey="game-manager-drawer"
			className="min-w-[300px] max-w-[500px]"
		>
			<section className="flex flex-col gap-5 w-full h-full">
				{children}
			</section>
		</Drawer.Modal>
	);
}

type DrawerHeaderProps = {
	icon: IconType;
	title: string;
	subTitle: string;
};

function DrawerHeader({ icon, title, subTitle }: DrawerHeaderProps) {
	return (
		<header className="flex flex-row gap-1 items-center">
			{icon({ size: 48, thikness: "light", color: Color.Neutral700 })}
			<div className="flex flex-col justify-center">
				<Drawer.Heading>{title}</Drawer.Heading>
				<p className="text-neutral-300 text-xs">{subTitle}</p>
			</div>
		</header>
	);
}

type DrawerBodyProps = {
	panels: Record<GameManagementTab, ReactElement>;
};

function DrawerBody({ panels }: DrawerBodyProps) {
	const activeTab = useGameManagementState((state) => state.activeTab);

	if (!activeTab) return null;

	return <section>{panels[activeTab]}</section>;
}

export const GameManagementDrawer = Object.assign(DrawerContainer, {
	Header: DrawerHeader,
	Body: DrawerBody,
});
