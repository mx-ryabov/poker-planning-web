import { forwardRef } from "react";
import { Popover } from "../../popover";

type DropdownTriggerProps = {
	children: React.ReactNode;
};

const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
	({ children }: DropdownTriggerProps, ref) => {
		return <Popover.Trigger ref={ref}>{children}</Popover.Trigger>;
	},
);
DropdownTrigger.displayName = Popover.Trigger.displayName;

export default DropdownTrigger;
