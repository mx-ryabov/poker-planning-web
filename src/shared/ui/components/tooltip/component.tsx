import { mergeClassNames } from "@/src/shared/lib/utils/merge-class-names";
import { ReactNode, useMemo } from "react";
import { PlacementAxis } from "react-aria";
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

const ARROW_PATH: Record<PlacementAxis, ReactNode> = {
	bottom: <path d="M0 8 L4 4 L8 8" />,
	top: <path d="M0 0 L4 4 L8 0" />,
	left: <path d="M0 0 L4 4 L0 8" />,
	center: <path d="M0 0 L4 4 L0 8" />,
	right: <path d="M8 0 L4 4 L8 8" />,
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
				"bg-neutral-900 text-neutral-100 text-sm px-3 py-2 rounded-lg shadow-lg",
				"data-entering:animate-fade-in data-exiting:animate-fade-in-reverse",
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
					{renderProps.placement && (
						<OverlayArrow>
							<svg
								className="text-neutral-900"
								width={8}
								height={8}
								viewBox="0 0 8 8"
							>
								{ARROW_PATH[renderProps.placement]}
							</svg>
						</OverlayArrow>
					)}
					{typeof children === "function"
						? children(renderProps)
						: children}
				</>
			)}
		</TooltipAria>
	);
}

export const Tooltip = Object.assign(Wrapper, { Content });
