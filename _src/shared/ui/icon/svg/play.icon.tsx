import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const PlayIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 12V8.44C4 4.02 7.13 2.21 10.96 4.42L14.05 6.2L17.14 7.98C20.97 10.19 20.97 13.81 17.14 16.02L14.05 17.8L10.96 19.58C7.13 21.79 4 19.98 4 15.56V12Z"
				stroke={props.color}
				strokeWidth={props.strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
});
