import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const InfoIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 8V13"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.9945 16H12.0035"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "InfoIcon");
