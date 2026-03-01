import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const MenuIcon = iconBuilder((props: SvgProps) => {
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
				d="M3 12H21"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
			/>
			<path
				d="M3 17H21"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
			/>
		</svg>
	);
}, "MenuIcon");
