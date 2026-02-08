import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const ArrowLeftIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.57 5.92999L3.5 12L9.57 18.07M20.5 12H3.67"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "ArrowLeftIcon");
