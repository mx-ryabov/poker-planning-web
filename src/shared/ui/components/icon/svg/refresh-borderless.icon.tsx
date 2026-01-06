import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const RefreshBorderlessIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.89 5.07999C14.02 4.81999 13.06 4.64999 12 4.64999C7.21002 4.64999 3.33002 8.52999 3.33002 13.32C3.33002 18.12 7.21002 22 12 22C16.79 22 20.67 18.12 20.67 13.33C20.67 11.55 20.13 9.88999 19.21 8.50999"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.13 5.32L13.24 2"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.13 5.32001L12.76 7.78001"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "RefreshBorderlessIcon");
