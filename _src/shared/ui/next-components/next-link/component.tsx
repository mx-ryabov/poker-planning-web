import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { CSSProperties, ForwardedRef, forwardRef, ReactNode } from "react";
import { forwardRefType } from "@react-types/shared/src/refs";
import {
	RenderProps,
	useRenderProps,
} from "@/_src/shared/lib/hooks/use-render-props";
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
	SlotProps;

function NextLinkButton(
	props: NextLinkButtonProps,
	ref: ForwardedRef<HTMLAnchorElement>,
) {
	[props, ref] = useContextProps(props, ref, LinkContext);
	const {
		size = "medium",
		variant = "default",
		appearance = "primary",
	} = props;

	const isDisabled = props.isDisabled || false;
	const slotValue = props.slot || undefined;

	const { linkProps, isPressed } = useLink(
		{ ...props, elementType: "a" },
		ref,
	);

	const { hoverProps, isHovered } = useHover(props);
	const { focusProps, isFocused, isFocusVisible } = useFocusRing();

	const dataFocused = isFocused || undefined;
	const dataHovered = isHovered || undefined;
	const dataPressed = isPressed || undefined;
	const dataFocusVisible = isFocusVisible || undefined;
	const dataDisabled = isDisabled || undefined;

	const renderProps = useRenderProps({
		...props,
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
			href={props.href}
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

const _NextLinkButton = (forwardRef as forwardRefType)(NextLinkButton);
export { _NextLinkButton as NextLinkButton };

export type NextPlainLinkProps = LinkProps &
	NextLinkProps &
	Omit<AriaLinkOptions, "elementType"> &
	HoverEvents &
	RenderProps<LinkRenderProps> &
	SlotProps;

function NextCustomLink(
	props: NextPlainLinkProps,
	ref: ForwardedRef<HTMLAnchorElement>,
) {
	[props, ref] = useContextProps(props, ref, LinkContext);

	const { linkProps, isPressed } = useLink(
		{ ...props, elementType: "a" },
		ref,
	);

	const { hoverProps, isHovered } = useHover(props);
	const { focusProps, isFocused, isFocusVisible } = useFocusRing();

	const renderProps = useRenderProps({
		...props,
		defaultClassName: "",
		values: {
			isCurrent: false,
			isDisabled: props.isDisabled || false,
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
			href={props.href}
			slot={props.slot || undefined}
			data-focused={isFocused || undefined}
			data-hovered={isHovered || undefined}
			data-pressed={isPressed || undefined}
			data-focus-visible={isFocusVisible || undefined}
			data-disabled={props.isDisabled || undefined}
		>
			{renderProps.children}
		</NextLink>
	);
}

const _NextLink = (forwardRef as forwardRefType)(NextCustomLink);
export { _NextLink as NextLink };
