import {
	setRefs,
	useEnterAnimation,
	useExitAnimation,
} from "@/_src/shared/lib";
import { forwardRef, ReactNode, RefObject, useRef } from "react";
import { usePopover } from "react-aria";
import { PopoverProps as AriaPopoverProps } from "react-aria-components";
import { OverlayTriggerState } from "react-stately";

export interface PopoverWithoutFocusManagmentProps
	extends Omit<AriaPopoverProps, "popoverRef"> {
	children: ReactNode;
	state: OverlayTriggerState;
	triggerRef: RefObject<HTMLDivElement | null>;
	className?: string;
	id: string;
}

export const PopoverWithoutFocusManagment = ({
	state,
	id,
	...props
}: PopoverWithoutFocusManagmentProps) => {
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const isExiting =
		useExitAnimation(popoverRef, state.isOpen) || props.isExiting || false;

	if (!state.isOpen && !isExiting) {
		return null;
	}

	return (
		<PopoverWithoutFocusManagmentInner
			{...props}
			state={state}
			isExiting={isExiting}
			id={id}
			ref={popoverRef}
		/>
	);
};

interface PopoverInnerProps extends AriaPopoverProps {
	children: ReactNode;
	state: OverlayTriggerState;
	isEntering?: boolean;
	isExiting: boolean;
	triggerRef: RefObject<HTMLDivElement | null>;
	className?: string;
	id: string;
}

const PopoverWithoutFocusManagmentInner = forwardRef<
	HTMLDivElement,
	PopoverInnerProps
>(({ children, state, offset = 8, className, isExiting, ...props }, ref) => {
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const isEntering =
		useEnterAnimation(popoverRef, !!props.placement) ||
		props.isEntering ||
		false;

	const { popoverProps } = usePopover(
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
			data-testid={`${props.id}-action-buttons`}
			className={className}
		>
			{children}
		</div>
	);
});
