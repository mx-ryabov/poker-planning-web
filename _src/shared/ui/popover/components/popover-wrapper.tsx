import { ContentPosition } from "@/_src/shared/lib";
import { cloneElement, useEffect, useRef, useState } from "react";
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
	contentWidth?: "fit-content" | "equal-to-trigger";
	onOpenChange?: (isOpened: boolean) => void;
};

export default function PopoverWrapper({
	children,
	position = ContentPosition.BottomStart,
	showingMode = "click",
	contentWidth = "fit-content",
	hideContentOnTriggerClick = true,
	onOpenChange,
}: PopoverProps) {
	const triggerRef = useRef<HTMLDivElement | null>(null);

	const [isOpened, setOpened] = useState<boolean>(false);

	useEffect(() => {
		onOpenChange && onOpenChange(isOpened);
	}, [onOpenChange, isOpened]);

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
					contentWidth,
				}}
			>
				<PublicPopoverProvider
					value={{ isOpened, close: () => setOpened(false) }}
				>
					{cloneElement(Trigger, { ref: triggerRef })}
					{Content}
				</PublicPopoverProvider>
			</PopoverContextStateProvider>
		</PopoverContextDispatchProvider>
	);
}
