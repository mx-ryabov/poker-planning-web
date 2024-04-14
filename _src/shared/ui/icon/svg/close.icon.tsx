import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const CloseIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7 17L17 7"
				stroke={props.color}
				strokeWidth={props.strokeWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M17 17L7 7"
				stroke={props.color}
				strokeWidth={props.strokeWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
