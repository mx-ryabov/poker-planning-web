import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const MagicPenIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.5 20.4999C4.33 21.3299 5.67 21.3299 6.5 20.4999L19.5 7.49994C20.33 6.66994 20.33 5.32994 19.5 4.49994C18.67 3.66994 17.33 3.66994 16.5 4.49994L3.5 17.4999C2.67 18.3299 2.67 19.6699 3.5 20.4999Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M18.01 8.98999L15.01 5.98999"
				strokeWidth={props.strokeWidth}
				stroke={props.color || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44Z"
				stroke={props.color || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44Z"
				stroke={props.color || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z"
				stroke={props.color || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "MagicPenIcon");
