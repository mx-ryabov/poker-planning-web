import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const ArrowLeftSimpleIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15 19.92L8.48003 13.4C7.71003 12.63 7.71003 11.37 8.48003 10.6L15 4.08"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				stroke-miterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
});
