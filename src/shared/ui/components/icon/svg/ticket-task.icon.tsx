import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const TicketTaskIcon = iconBuilder((props: SvgProps) => {
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
			<path
				d="M7.16666 9.99999L9.05332 11.8867L12.8333 8.11333"
				stroke="white"
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "TicketTaskIcon");
