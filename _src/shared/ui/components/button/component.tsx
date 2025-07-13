"use client";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { IconType } from "../icon/icon-builder";
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

type BaseButtonProps = { isPending?: boolean } & ButtonStylesProps &
	ButtonProps &
	HTMLAttributes<HTMLButtonElement>;

export type LabeledButtonProps = BaseButtonProps & {
	title: string;
	contentLeft?: ReactNode;
	contentRight?: ReactNode;
};

type SquareButtonProps = BaseButtonProps & { icon: IconType };

export const Button = forwardRef<HTMLButtonElement, LabeledButtonProps>(
	(props, ref) => {
		[props, ref] = useContextProps(props, ref, ButtonContext);
		const {
			title,
			size = "medium",
			variant = "default",
			appearance = "primary",
			isPending = false,
			contentLeft,
			contentRight,
			role,
			className,
		} = props;

		let { buttonProps, isPressed } = useButton(
			{
				...props,
				isDisabled: props.isDisabled || isPending,
			},
			ref,
		);
		let { hoverProps, isHovered } = useHover({
			...props,
			isDisabled: props.isDisabled || isPending,
		});
		let { focusProps, isFocused, isFocusVisible } = useFocusRing(props);

		return (
			<button
				style={COLOR_SCHEMES[appearance] as any}
				className={twMerge(
					buttonStyles({
						size,
						variant,
						form: "default",
						excludeFromFocus: props.excludeFromTabOrder,
						// we need to get the ButtonContextValue from the context, but for some reason it's not exposed for public usage
						isPressed:
							isPressed ||
							(
								props as LabeledButtonProps & {
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
						<div className="border-r-primary-500 animate-rotation-linear aspect-square w-6 rounded-full border-4 border-neutral-200" />
					</div>
				</div>
				{contentLeft}
				{title}
				{contentRight}
			</button>
		);
	},
);

const spinnerStyles = cva("flex justify-center items-center", {
	variants: {
		isActive: {
			true: "block animate-fade-in-with-resize *:animate-scale-up",
			false: "hidden",
		},
	},
});

export const ButtonSquare = forwardRef<HTMLButtonElement, SquareButtonProps>(
	(props, ref) => {
		[props, ref] = useContextProps(props, ref, ButtonContext);
		const {
			size = "medium",
			variant = "default",
			appearance = "primary",
			isPending = false,
			icon,
			role,
			className,
			style,
		} = props;

		const { buttonProps, isPressed: isPressedLocal } = useButton(
			{
				...props,
				isDisabled: props.isDisabled || isPending,
			},
			ref,
		);
		let { hoverProps, isHovered } = useHover({
			...props,
			isDisabled: props.isDisabled || isPending,
		});
		let { focusProps, isFocused, isFocusVisible } = useFocusRing(props);

		const isPressed =
			isPressedLocal ||
			(
				props as SquareButtonProps & {
					isPressed?: boolean;
				}
			).isPressed;

		return (
			<button
				className={twMerge(
					buttonStyles({
						size,
						variant,
						form: "square",
						// we need to get the ButtonContextValue from the context, but for some reason it's not exposed for public usage
						isPressed,
						excludeFromFocus: props.excludeFromTabOrder,
						isFocused: isFocusVisible,
						isHovered,
						isDisabled: props.isDisabled || isPending,
					}),
					className,
				)}
				ref={ref}
				aria-label={buttonProps["aria-label"] || "icon button"}
				data-focused={isFocused || undefined}
				data-pressed={isPressed}
				role={role || "button"}
				style={{ ...(COLOR_SCHEMES[appearance] as any), ...style }}
				{...mergeProps(buttonProps, focusProps, hoverProps)}
			>
				<div className={spinnerStyles({ isActive: isPending })}>
					<div>
						<div className="border-r-primary-500 animate-rotation-linear aspect-square w-6 rounded-full border-4 border-neutral-200" />
					</div>
				</div>
				{!isPending && icon({ size: ButtonIconSize[size] })}
			</button>
		);
	},
);

const ButtonIconSize = {
	small: 16,
	medium: 18,
	large: 24,
};
