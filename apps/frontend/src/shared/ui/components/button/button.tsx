"use client";
import { HTMLAttributes, ReactNode, RefObject } from "react";
import {
	ButtonContext,
	ButtonProps,
	useContextProps,
} from "react-aria-components";
import { mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { twMerge } from "tailwind-merge";
import {
	buttonStyles,
	ButtonStylesProps,
	COLOR_SCHEMES,
} from "../../styles/button.styles";
import { cva } from "class-variance-authority";

const spinnerStyles = cva("flex justify-center items-center", {
	variants: {
		isActive: {
			true: "block animate-fade-in-with-resize *:animate-scale-up",
			false: "hidden",
		},
	},
});

type ButtonComponentProps = {
	isPending?: boolean;
	children: ReactNode;
	shape?: "default" | "square";
	ref?: RefObject<HTMLButtonElement | null>;
} & ButtonStylesProps &
	ButtonProps &
	HTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonComponentProps) {
	let { ref, ...restProps } = props;
	[restProps, ref] = useContextProps(restProps, ref, ButtonContext);
	const {
		size = "medium",
		variant = "default",
		appearance = "primary",
		isPending = false,
		shape = "default",
		children,
		role,
		className,
	} = restProps;

	const { buttonProps, isPressed } = useButton(
		{
			...restProps,
			isDisabled: restProps.isDisabled || isPending,
		},
		ref,
	);
	const { hoverProps, isHovered } = useHover({
		...restProps,
		isDisabled: restProps.isDisabled || isPending,
	});
	const { focusProps, isFocused, isFocusVisible } = useFocusRing(restProps);

	const isChildrenVisible = !(isPending && shape === "square");

	return (
		<button
			style={COLOR_SCHEMES[appearance] as React.CSSProperties}
			className={twMerge(
				buttonStyles({
					size,
					variant,
					form: shape,
					excludeFromFocus: restProps.excludeFromTabOrder,
					// we need to get the ButtonContextValue from the context, but for some reason it's not exposed for public usage
					isPressed:
						isPressed ||
						(
							restProps as ButtonComponentProps & {
								isPressed?: boolean;
							}
						).isPressed,
					isFocused: isFocusVisible,
					isHovered,
					isDisabled: restProps.isDisabled || isPending,
				}),
				className,
			)}
			ref={ref}
			role={role || "button"}
			data-focused={isFocused || undefined}
			aria-label={buttonProps["aria-label"] || "icon button"}
			{...mergeProps(buttonProps, focusProps, hoverProps)}
		>
			<div className={spinnerStyles({ isActive: isPending })}>
				<div>
					<div className="border-r-primary-500 animate-rotation-linear aspect-square w-4 rounded-full border-2 border-y-neutral-200 border-l-neutral-200" />
				</div>
			</div>
			{isChildrenVisible && children}
		</button>
	);
}
