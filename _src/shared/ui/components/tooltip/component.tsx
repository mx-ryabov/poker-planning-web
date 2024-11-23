import { mergeClassNames } from "@/_src/shared/lib/utils/merge-class-names";
import { useMemo } from "react";
import {
	TooltipTrigger as TooltipTriggerAria,
	Tooltip as TooltipAria,
	TooltipProps as TooltipAriaProps,
	TooltipTriggerComponentProps as TooltipAriaTriggerComponentProps,
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
			{children}
		</TooltipAria>
	);
}

export const Tooltip = Object.assign(Wrapper, { Content });
