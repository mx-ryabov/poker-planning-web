import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const TrashIcon = iconBuilder((props: SvgProps) => {
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
				d="M17.9 9.05C15.72 8.83 13.52 8.72 11.33 8.72C10.03 8.72 8.72997 8.79 7.43997 8.92L6.09998 9.05"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.70996 8.39L9.84996 7.53C9.94996 6.91 10.03 6.44 11.14 6.44H12.86C13.97 6.44 14.0499 6.93 14.1499 7.53L14.2899 8.38"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.49 9.13L16.06 15.73C15.99 16.76 15.93 17.56 14.1 17.56H9.89C8.06 17.56 7.99999 16.76 7.92999 15.73L7.5 9.13"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "TrashIcon");
