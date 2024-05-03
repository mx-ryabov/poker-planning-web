import { ContentPosition } from "@/_src/shared/lib";
import { cloneElement, useRef, useState } from "react";
import {
	PopoverContextDispatchProvider,
	PopoverContextStateProvider,
} from "../providers/internal-popover-provider";
import { PublicPopoverProvider } from "../providers/public-popover-provider";
import { PopoverTriggerDN } from "./popover-trigger";
import { PopoverContentDN } from "./popover-content";

export type PopoverCompoundComponentType = "PopoverTrigger" | "PopoverContent";

type PopoverProps = {
	children: [JSX.Element, JSX.Element];
	position?: ContentPosition;
	showingMode?: "click" | "hover";
	hideContentOnTriggerClick?: boolean;
};

export default function PopoverWrapper({
	children,
	position = ContentPosition.BottomStart,
	showingMode = "click",
	hideContentOnTriggerClick = true,
}: PopoverProps) {
	const triggerRef = useRef<HTMLDivElement | null>(null);

	const [isOpened, setOpened] = useState<boolean>(false);

	const Trigger =
		children[0].type.displayName === PopoverTriggerDN
			? children[0]
			: children[1];
	const Content =
		children[0].type.displayName === PopoverContentDN
			? children[0]
			: children[1];

	return (
		<PopoverContextDispatchProvider value={{ open: setOpened }}>
			<PopoverContextStateProvider
				value={{
					isOpened,
					triggerRef,
					position,
					showingMode,
					hideContentOnTriggerClick,
				}}
			>
				<PublicPopoverProvider
					value={{ isOpened, close: () => setOpened(false) }}
				>
					<div className="relative w-fit h-fit">
						{cloneElement(Trigger, { ref: triggerRef })}
						{Content}
					</div>
				</PublicPopoverProvider>
			</PopoverContextStateProvider>
		</PopoverContextDispatchProvider>
	);
}
