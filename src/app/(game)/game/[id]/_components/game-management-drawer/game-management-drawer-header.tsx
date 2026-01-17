import { Color } from "@/src/shared/ui/colors";
import { Drawer } from "@/src/shared/ui/components/drawer";
import { GameDrawerPanelHeader } from "./game-management-drawer";

type NewProps = {
	header: GameDrawerPanelHeader;
};
export function DrawerHeader({ header }: NewProps) {
	return (
		<header
			className="mx-6 mt-6 h-12"
			data-testid="game-management-drawer-header"
		>
			<div className="flex h-full w-full flex-row justify-between items-center">
				<div className="relative flex h-full w-full flex-col overflow-hidden">
					<div className="flex flex-row gap-1 items-center">
						{header.icon({
							size: 42,
							thikness: "light",
							color: Color.Neutral900,
						})}
						<div className="flex flex-col justify-center">
							<Drawer.Heading>{header.title}</Drawer.Heading>
							{header?.subTitle && (
								<p className="text-xs text-neutral-700">
									{header?.subTitle}
								</p>
							)}
						</div>
					</div>
				</div>
				{header.rightSlot}
			</div>
		</header>
	);
}
