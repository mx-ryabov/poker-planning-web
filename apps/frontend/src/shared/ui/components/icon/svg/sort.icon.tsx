import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const SortIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3 7H21"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
			/>
			<path
				d="M6 12H18"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
			/>
			<path
				d="M10 17H14"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
			/>
		</svg>
	);
}, "SortIcon");
