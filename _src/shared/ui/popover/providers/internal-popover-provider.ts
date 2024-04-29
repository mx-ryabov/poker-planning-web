import { ContentPosition, buildProvider } from "@/_src/shared/lib";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

type PopoverContextStateType = {
	isOpened: boolean;
	triggerRef: MutableRefObject<HTMLDivElement | null> | null;
	position: ContentPosition;
	showingMode?: "click" | "hover";
	hideContentOnTriggerClick?: boolean;
};

const [usePopoverState, PopoverContextStateProvider] =
	buildProvider<PopoverContextStateType>();

type PopoverContextDispatchType = {
	open: Dispatch<SetStateAction<boolean>>;
};

const [usePopoverDispatch, PopoverContextDispatchProvider] =
	buildProvider<PopoverContextDispatchType>();

export {
	usePopoverDispatch,
	PopoverContextDispatchProvider,
	usePopoverState,
	PopoverContextStateProvider,
};
