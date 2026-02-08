import { iconBuilder } from "../icon-builder";
import { SvgProps } from "../types";

export const TicketStoryIcon = iconBuilder((props: SvgProps) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				width="100%"
				height="100%"
				rx="6"
				fill={props.color || "currentColor"}
			/>
			<path
				d="M12.1611 5.55557H7.83892C7.38114 5.55704 6.94252 5.73954 6.61882 6.06325C6.29511 6.38695 6.11261 6.82557 6.11115 7.28335V13.5945C6.11115 14.4 6.68892 14.7445 7.39448 14.35L9.57781 13.1333C9.81114 13.0056 10.1889 13.0056 10.4167 13.1333L12.6 14.35C13.3111 14.7389 13.8889 14.4 13.8889 13.5945V7.28335C13.8889 6.33335 13.1111 5.55557 12.1611 5.55557Z"
				fill="white"
			/>
		</svg>
	);
}, "TicketStoryIcon");
