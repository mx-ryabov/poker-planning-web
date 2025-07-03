import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const MailIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 22 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M16 18.5H6C3 18.5 1 17 1 13.5V6.5C1 3 3 1.5 6 1.5H16C19 1.5 21 3 21 6.5V13.5C21 17 19 18.5 16 18.5Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
			/>
			<path
				d="M16 7L12.87 9.5C11.84 10.32 10.15 10.32 9.12 9.5L6 7"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
			/>
		</svg>
	);
}, "MailIcon");
