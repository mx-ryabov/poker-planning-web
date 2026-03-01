import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const SearchIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="11"
				cy="11"
				r="7"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				fill="none"
			/>
			<line
				x1="16.2"
				y1="16.2"
				x2="21"
				y2="21"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
			/>
		</svg>
	);
}, "SearchIcon");
