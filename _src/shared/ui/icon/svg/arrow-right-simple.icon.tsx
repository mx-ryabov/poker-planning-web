import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const ArrowRightSimplecon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.91003 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91003 4.07999"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				stroke-miterlimit="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
