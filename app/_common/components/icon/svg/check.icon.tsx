import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const CheckIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5 12L9.66118 17L19 7"
				stroke={props.color}
				strokeWidth={props.strokeWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
