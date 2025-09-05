import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const FlashWithLinesIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.31993 13.28H12.4099V20.48C12.4099 21.54 13.7299 22.04 14.4299 21.24L21.9999 12.64C22.6599 11.89 22.1299 10.72 21.1299 10.72H18.0399V3.51997C18.0399 2.45997 16.7199 1.95997 16.0199 2.75997L8.44994 11.36C7.79994 12.11 8.32993 13.28 9.31993 13.28Z"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
			/>
			<path
				d="M8.5 4H1.5"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
			/>
			<path
				d="M7.5 20H1.5"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
			/>
			<path
				d="M4.5 12H1.5"
				stroke={props.color || "currentColor"}
				strokeWidth={props.strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
			/>
		</svg>
	);
}, "FlashWithLinesIcon");
