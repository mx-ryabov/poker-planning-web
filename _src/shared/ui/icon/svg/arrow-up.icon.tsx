import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const ArrowUpIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.08002 15.05"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
});
