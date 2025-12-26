"use client";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
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
} & ButtonStylesProps &
	ButtonProps &
	HTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonComponentProps>(
	(props, ref) => {
		[props, ref] = useContextProps(props, ref, ButtonContext);
		const {
			size = "medium",
			variant = "default",
			appearance = "primary",
			isPending = false,
			shape = "default",
			children,
			role,
			className,
		} = props;

		const { buttonProps, isPressed } = useButton(
			{
				...props,
				isDisabled: props.isDisabled || isPending,
			},
			ref,
		);
		const { hoverProps, isHovered } = useHover({
			...props,
			isDisabled: props.isDisabled || isPending,
		});
		const { focusProps, isFocused, isFocusVisible } = useFocusRing(props);

		return (
			<button
				style={COLOR_SCHEMES[appearance] as React.CSSProperties}
				className={twMerge(
					buttonStyles({
						size,
						variant,
						form: shape,
						excludeFromFocus: props.excludeFromTabOrder,
						// we need to get the ButtonContextValue from the context, but for some reason it's not exposed for public usage
						isPressed:
							isPressed ||
							(
								props as ButtonComponentProps & {
									isPressed?: boolean;
								}
							).isPressed,
						isFocused: isFocusVisible,
						isHovered,
						isDisabled: props.isDisabled || isPending,
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
				{children}
			</button>
		);
	},
);
