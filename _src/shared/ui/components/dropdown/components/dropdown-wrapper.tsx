import { ContentPosition } from "@/_src/shared/lib";
import { FC } from "react";
import { Popover } from "../../popover";

type DropdownProps = {
	children: [JSX.Element, JSX.Element];
	position?: ContentPosition;
};

export const DropdownWrapper: FC<DropdownProps> = ({ children, position }) => {
	return <Popover position={position}>{children}</Popover>;
};
