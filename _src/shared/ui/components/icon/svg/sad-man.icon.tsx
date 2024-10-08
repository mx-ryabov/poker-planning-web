import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const SadManIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7 8.75C8 7.75 9.63 7.75 10.64 8.75"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13.36 8.75C14.36 7.75 15.99 7.75 17 8.75"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.4 17.7H15.6C16.1 17.7 16.5 17.3 16.5 16.8C16.5 14.31 14.49 12.3 12 12.3C9.51 12.3 7.5 14.31 7.5 16.8C7.5 17.3 7.9 17.7 8.4 17.7Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "SadManIcon");
