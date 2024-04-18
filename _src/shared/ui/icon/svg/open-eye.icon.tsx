import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const OpenEyeIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42 12 8.42C13.98 8.42 15.58 10.02 15.58 12Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C18.82 5.8 15.53 3.72 12 3.72C8.46997 3.72 5.17997 5.8 2.88997 9.4C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
