import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const ArrowRightIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.4299 18.07L20.4999 12L14.4299 5.93001M3.49994 12H20.3299"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
});
