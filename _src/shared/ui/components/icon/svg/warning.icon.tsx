import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const WarningIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 7.75V13"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M21.08 8.58003V15.42C21.08 16.54 20.4799 17.58 19.5099 18.15L13.5699 21.58C12.5999 22.14 11.3999 22.14 10.4199 21.58L4.47992 18.15C3.50992 17.59 2.90991 16.55 2.90991 15.42V8.58003C2.90991 7.46003 3.50992 6.41999 4.47992 5.84999L10.4199 2.42C11.3899 1.86 12.5899 1.86 13.5699 2.42L19.5099 5.84999C20.4799 6.41999 21.08 7.45003 21.08 8.58003Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 16.2V16.3"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
});