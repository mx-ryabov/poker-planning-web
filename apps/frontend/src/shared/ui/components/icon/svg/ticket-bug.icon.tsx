import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const TicketBugIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				width="20"
				height="20"
				rx="6"
				fill={props.color || "currentColor"}
			/>
			<circle cx="10" cy="10" r="4" fill="white" />
		</svg>
	);
}, "TicketBugIcon");
