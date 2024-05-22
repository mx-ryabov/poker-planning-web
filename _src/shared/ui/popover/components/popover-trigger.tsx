import {
	Children,
	ForwardedRef,
	cloneElement,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import {
	usePopoverDispatch,
	usePopoverState,
} from "../providers/internal-popover-provider";
import { PopoverCompoundComponentType } from "./popover-wrapper";
import { mergeProps, useEventForTrigger } from "@/_src/shared/lib";

export type PopoverTriggerProps = {
	children: React.ReactElement;
};

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
	({ children }, ref) => {
		const { showingMode, hideContentOnTriggerClick } = usePopoverState();
		const { open } = usePopoverDispatch();

		const child = useMemo(() => {
			if (typeof children === "string") {
				return <span>{children}</span>;
			}

			return Children.only(children) as React.ReactElement & { ref: any };
		}, [children]);

		const onMouseOver = useCallback(() => {
			if (showingMode === "hover") {
				open(true);
			}
		}, [showingMode, open]);

		const onMouseLeave = useCallback(() => {
			if (showingMode === "hover") {
				open(false);
			}
		}, [showingMode, open]);

		const onClick = useCallback(() => {
			if (showingMode === "click") {
				open((prev) => (hideContentOnTriggerClick ? !prev : true));
			}
		}, [showingMode, open]);

		// use mergeProps instead?
		useEventForTrigger("click", ref, onClick);
		useEventForTrigger("mouseover", ref, onMouseOver);
		useEventForTrigger("mouseleave", ref, onMouseLeave);

		return cloneElement(child, { ref });
	},
);

export const PopoverTriggerDN: PopoverCompoundComponentType = "PopoverTrigger";
PopoverTrigger.displayName = PopoverTriggerDN;

export default PopoverTrigger;
