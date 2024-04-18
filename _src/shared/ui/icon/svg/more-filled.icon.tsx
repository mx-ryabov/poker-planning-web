import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const MoreFilledIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5 11C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13C5.55 13 6 12.55 6 12C6 11.45 5.55 11 5 11Z"
				fill={props.color}
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
			/>
			<path
				d="M19 11C18.45 11 18 11.45 18 12C18 12.55 18.45 13 19 13C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
				fill={props.color}
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
			/>
			<path
				d="M12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11Z"
				fill={props.color}
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
			/>
		</svg>
	);
});
