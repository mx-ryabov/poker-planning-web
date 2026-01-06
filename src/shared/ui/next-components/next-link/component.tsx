import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { CSSProperties, ReactNode, RefObject } from "react";
import {
	RenderProps,
	useRenderProps,
} from "@/src/shared/lib/hooks/use-render-props";
import {
	useContextProps,
	LinkContext,
	LinkRenderProps,
	SlotProps,
	LinkProps as LinkAriaProps,
} from "react-aria-components";
import {
	AriaLinkOptions,
	HoverEvents,
	mergeProps,
	useFocusRing,
	useHover,
	useLink,
} from "react-aria";
import {
	buttonStyles,
	ButtonStylesProps,
	COLOR_SCHEMES,
} from "../../styles/button.styles";
import { twMerge } from "tailwind-merge";
/**
 * We need this implementation to use NextJS Link component
 */

type LinkProps = LinkAriaProps & {
	children: ReactNode;
};
type LinkButtonProps = LinkProps & ButtonStylesProps;

export type NextLinkButtonProps = LinkButtonProps &
	NextLinkProps &
	Omit<AriaLinkOptions, "elementType"> &
	HoverEvents &
	RenderProps<LinkRenderProps> &
	SlotProps & {
		ref?: RefObject<HTMLAnchorElement | null>;
	};

export function NextLinkButton(props: NextLinkButtonProps) {
	let { ref, ...restProps } = props;
	[restProps, ref] = useContextProps(restProps, ref, LinkContext);
	const {
		size = "medium",
		variant = "default",
		appearance = "primary",
	} = restProps;

	const isDisabled = restProps.isDisabled || false;
	const slotValue = restProps.slot || undefined;

	const { linkProps, isPressed } = useLink(
		{ ...restProps, elementType: "a" },
		ref,
	);

	const { hoverProps, isHovered } = useHover(restProps);
	const { focusProps, isFocused, isFocusVisible } = useFocusRing();

	const dataFocused = isFocused || undefined;
	const dataHovered = isHovered || undefined;
	const dataPressed = isPressed || undefined;
	const dataFocusVisible = isFocusVisible || undefined;
	const dataDisabled = isDisabled || undefined;

	const renderProps = useRenderProps({
		...restProps,
		defaultClassName: "",
		values: {
			isCurrent: false,
			isDisabled,
			isPressed,
			isHovered,
			isFocused,
			isFocusVisible,
		},
	});

	const btnStyles = () =>
		twMerge(
			buttonStyles({
				size,
				variant,
				form: "default",
				isPressed: isPressed,
				isFocused: isFocusVisible,
				isHovered: isHovered,
			}),
			renderProps.className,
		);

	return (
		<NextLink
			ref={ref}
			{...mergeProps(renderProps, linkProps, hoverProps, focusProps)}
			style={COLOR_SCHEMES[appearance] as CSSProperties}
			className={btnStyles()}
			href={restProps.href}
			slot={slotValue}
			data-focused={dataFocused}
			data-hovered={dataHovered}
			data-pressed={dataPressed}
			data-focus-visible={dataFocusVisible}
			data-disabled={dataDisabled}
		>
			{renderProps.children}
		</NextLink>
	);
}

export type NextPlainLinkProps = LinkProps &
	NextLinkProps &
	Omit<AriaLinkOptions, "elementType"> &
	HoverEvents &
	RenderProps<LinkRenderProps> &
	SlotProps & {
		ref?: RefObject<HTMLAnchorElement | null>;
	};

export function NextLink_(props: NextPlainLinkProps) {
	let { ref, ...restProps } = props;
	[restProps, ref] = useContextProps(restProps, ref, LinkContext);

	const { linkProps, isPressed } = useLink(
		{ ...restProps, elementType: "a" },
		ref,
	);

	const { hoverProps, isHovered } = useHover(restProps);
	const { focusProps, isFocused, isFocusVisible } = useFocusRing();

	const renderProps = useRenderProps({
		...restProps,
		defaultClassName: "",
		values: {
			isCurrent: false,
			isDisabled: restProps.isDisabled || false,
			isPressed,
			isHovered,
			isFocused,
			isFocusVisible,
		},
	});

	const linkStyles = () =>
		twMerge(
			"underline underline-offset-2 decoration-from-font hover:text-primary-500 transition-colors cursor-pointer outline-hidden",
			renderProps.className,
		);

	return (
		<NextLink
			ref={ref}
			{...mergeProps(renderProps, linkProps, hoverProps, focusProps)}
			className={linkStyles()}
			href={restProps.href}
			slot={restProps.slot || undefined}
			data-focused={isFocused || undefined}
			data-hovered={isHovered || undefined}
			data-pressed={isPressed || undefined}
			data-focus-visible={isFocusVisible || undefined}
			data-disabled={restProps.isDisabled || undefined}
		>
			{renderProps.children}
		</NextLink>
	);
}

// Export with the original name for backward compatibility
export { NextLink_ as NextLink };
