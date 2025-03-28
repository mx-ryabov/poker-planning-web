import { ReactNode } from "react";
import {
	LinkProps as LinkAriaProps,
	Link as LinkAria,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { buttonStyles, ButtonStylesProps } from "../../styles/button.styles";
import { mergeProps } from "react-aria";

type LinkProps = LinkAriaProps & {
	children: ReactNode;
};

export function Link(props: LinkProps) {
	const { children, className, ...htmlAnchorProps } = props;

	const linkStyles: LinkProps["className"] = (renderProps) =>
		twMerge(
			"underline underline-offset-2 decoration-from-font hover:text-primary-500 transition-colors cursor-pointer outline-hidden",
			typeof className === "function"
				? className(renderProps)
				: className,
		);

	return (
		<LinkAria {...htmlAnchorProps} className={linkStyles}>
			{children}
		</LinkAria>
	);
}

export type LinkButtonProps = LinkProps & ButtonStylesProps;

export function LinkButton(props: LinkButtonProps) {
	const {
		children,
		className,
		size = "medium",
		variant = "default",
		...htmlAnchorProps
	} = props;

	const btnStyles: LinkProps["className"] = (renderProps) =>
		twMerge(
			buttonStyles({
				size,
				variant,
				form: "default",
				isPressed: renderProps.isPressed,
				isFocused: renderProps.isFocusVisible,
				isHovered: renderProps.isHovered,
			}),
			typeof className === "function"
				? className(renderProps)
				: className,
		);

	return (
		<LinkAria {...mergeProps(htmlAnchorProps)} className={btnStyles}>
			{children}
		</LinkAria>
	);
}
