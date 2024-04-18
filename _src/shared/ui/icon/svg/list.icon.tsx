import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const ListIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.37 8.88H17.62M6.38 8.88L7.13 9.63L9.38 7.38M12.37 15.88H17.62M6.38 15.88L7.13 16.63L9.38 14.38"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
