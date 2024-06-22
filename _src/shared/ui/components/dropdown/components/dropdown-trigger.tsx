import { forwardRef } from "react";
import { Popover } from "../../popover";

type DropdownTriggerProps = {
	children: React.ReactNode;
};

const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
	({ children }: DropdownTriggerProps, ref) => {
		return <div />;
	},
);

export default DropdownTrigger;
