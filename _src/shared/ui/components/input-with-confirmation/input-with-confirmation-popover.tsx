import {
	setRefs,
	useClickOutside,
	useEnterAnimation,
	useExitAnimation,
} from "@/_src/shared/lib";
import { forwardRef, ReactNode, RefObject, useRef } from "react";
import { usePopover } from "react-aria";
import { PopoverProps as AriaPopoverProps } from "react-aria-components";
import { OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
	children: ReactNode;
	state: OverlayTriggerState;
	triggerRef: RefObject<HTMLDivElement>;
	className: string;
}

export const PopoverWithoutFocusManagment = ({
	state,
	...props
}: PopoverProps) => {
	let popoverRef = useRef<HTMLDivElement>(null);
	useClickOutside([props.triggerRef, popoverRef], state.close);
	let isExiting =
		useExitAnimation(popoverRef, state.isOpen) || props.isExiting || false;

	if (!state.isOpen && !isExiting) {
		return null;
	}

	return (
		<PopoverWithoutFocusManagmentInner
			{...props}
			state={state}
			isExiting={isExiting}
			ref={popoverRef}
		/>
	);
};

interface PopoverInnerProps extends AriaPopoverProps {
	children: ReactNode;
	state: OverlayTriggerState;
	isEntering?: boolean;
	isExiting: boolean;
	triggerRef: RefObject<HTMLDivElement>;
	className: string;
}

const PopoverWithoutFocusManagmentInner = forwardRef<
	HTMLDivElement,
	PopoverInnerProps
>(({ children, state, offset = 8, className, isExiting, ...props }, ref) => {
	let popoverRef = useRef<HTMLDivElement>(null);
	let isEntering =
		useEnterAnimation(popoverRef, !!props.placement) ||
		props.isEntering ||
		false;

	let { popoverProps } = usePopover(
		{
			...props,
			offset,
			popoverRef,
		},
		state,
	);

	return (
		<div
			data-entering={isEntering || undefined}
			data-exiting={isExiting || undefined}
			{...popoverProps}
			onBlur={undefined}
			ref={setRefs(popoverRef, ref)}
			data-testid="action-buttons"
			className={className}
		>
			{children}
		</div>
	);
});
