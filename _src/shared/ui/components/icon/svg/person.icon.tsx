import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const PersonIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M20.59 22C20.59 18.13 16.74 15 12 15C7.25997 15 3.40997 18.13 3.40997 22M12 12C13.3261 12 14.5978 11.4732 15.5355 10.5355C16.4732 9.59785 17 8.32608 17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5978 2.52678 13.3261 2 12 2C10.6739 2 9.40212 2.52678 8.46444 3.46447C7.52676 4.40215 6.99997 5.67392 6.99997 7C6.99997 8.32608 7.52676 9.59785 8.46444 10.5355C9.40212 11.4732 10.6739 12 12 12Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}, "PersonIcon");
