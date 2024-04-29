import { forwardRef } from "react";
import {
	usePopoverDispatch,
	usePopoverState,
} from "../providers/internal-popover-provider";
import { PopoverCompoundComponentType } from "./popover-wrapper";

export type PopoverTriggerProps = {
	children: React.ReactNode;
};

const PopoverTrigger = forwardRef<HTMLDivElement, PopoverTriggerProps>(
	({ children }: PopoverTriggerProps, ref) => {
		const { showingMode, hideContentOnTriggerClick } = usePopoverState();
		const { open } = usePopoverDispatch();

		return (
			<div
				className="w-fit"
				ref={ref}
				onMouseOver={() => {
					if (showingMode === "hover") {
						open(true);
					}
				}}
				onMouseLeave={() => {
					if (showingMode === "hover") {
						open(false);
					}
				}}
				onClick={() => {
					if (showingMode === "click") {
						open((prev) =>
							hideContentOnTriggerClick ? !prev : true,
						);
					}
				}}
			>
				{children}
			</div>
		);
	},
);
export const PopoverTriggerDN: PopoverCompoundComponentType = "PopoverTrigger";
PopoverTrigger.displayName = PopoverTriggerDN;

export default PopoverTrigger;
