import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const PlusIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6 12H18"
				stroke={props.color}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 18V6"
				stroke={props.color}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
});
