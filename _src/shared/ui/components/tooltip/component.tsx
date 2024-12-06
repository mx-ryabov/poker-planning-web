import { mergeClassNames } from "@/_src/shared/lib/utils/merge-class-names";
import { ReactNode, useMemo } from "react";
import { Placement } from "react-aria";
import {
	TooltipTrigger as TooltipTriggerAria,
	Tooltip as TooltipAria,
	TooltipProps as TooltipAriaProps,
	TooltipTriggerComponentProps as TooltipAriaTriggerComponentProps,
	OverlayArrow,
} from "react-aria-components";

type TriggerProps = TooltipAriaTriggerComponentProps;

function Wrapper(props: TriggerProps) {
	const { children, delay = 0, closeDelay = 300, ...restProps } = props;
	console.log(restProps);

	return (
		<TooltipTriggerAria
			{...restProps}
			closeDelay={closeDelay}
			delay={delay}
		>
			{children}
		</TooltipTriggerAria>
	);
}

type ContentProps = TooltipAriaProps;

const ARROW_PATH: Record<Placement, ReactNode> = {
	bottom: <path d="M0 8 L4 4 L8 8" />,
	"bottom left": <path d="M0 8 L4 4 L8 8" />,
	"bottom right": <path d="M0 8 L4 4 L8 8" />,
	"bottom start": <path d="M0 8 L4 4 L8 8" />,
	"bottom end": <path d="M0 8 L4 4 L8 8" />,

	top: <path d="M0 0 L4 4 L8 0" />,
	"top left": <path d="M0 0 L4 4 L8 0" />,
	"top right": <path d="M0 0 L4 4 L8 0" />,
	"top start": <path d="M0 0 L4 4 L8 0" />,
	"top end": <path d="M0 0 L4 4 L8 0" />,

	left: <path d="M0 0 L4 4 L0 8" />,
	"left top": <path d="M0 0 L4 4 L0 8" />,
	"left bottom": <path d="M0 0 L4 4 L0 8" />,

	start: <path d="M0 0 L4 4 L0 8" />,
	"start top": <path d="M0 0 L4 4 L0 8" />,
	"start bottom": <path d="M0 0 L4 4 L0 8" />,

	right: <path d="M8 0 L4 4 L8 8" />,
	"right top": <path d="M8 0 L4 4 L8 8" />,
	"right bottom": <path d="M8 0 L4 4 L8 8" />,

	end: <path d="M8 0 L4 4 L8 8" />,
	"end top": <path d="M8 0 L4 4 L8 8" />,
	"end bottom": <path d="M8 0 L4 4 L8 8" />,
};

function Content(props: ContentProps) {
	const {
		children,
		offset = 8,
		placement = "bottom",
		className,
		...restProps
	} = props;

	const mergedClassName = useMemo(
		() =>
			mergeClassNames(
				"bg-neutral-500 text-neutral-100 text-sm px-3 py-2 rounded-lg shadow-lg",
				"data-[entering]:animate-fade-in data-[exiting]:animate-fade-in-reverse",
				className,
			),
		[className],
	);

	return (
		<TooltipAria
			{...restProps}
			offset={offset}
			placement={placement}
			className={mergedClassName}
		>
			{(renderProps) => (
				<>
					<OverlayArrow>
						<svg width={8} height={8} viewBox="0 0 8 8">
							{ARROW_PATH[placement]}
						</svg>
					</OverlayArrow>
					{typeof children === "function"
						? children(renderProps)
						: children}
				</>
			)}
		</TooltipAria>
	);
}

export const Tooltip = Object.assign(Wrapper, { Content });
