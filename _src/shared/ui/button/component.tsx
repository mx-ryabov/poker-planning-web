import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { IconType } from "../icon/icon-builder";

type HtmlButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

type BaseButtonProps = HtmlButtonProps & {
	size?: "small" | "medium" | "large";
	styleType?: "default" | "outline" | "ghost" | "grayed-out";
};

type DefaultButtonProps = BaseButtonProps & {
	title: string;
	iconLeft?: IconType;
	iconRight?: IconType;
};

type SquareButtonProps = BaseButtonProps & { icon: IconType };

const button = cva(
	[
		"transition-all",
		"duration-150",
		"disabled:text-neutral-300",
		"disabled:drop-shadow-none",
		"flex",
		"justify-center",
		"items-center",
		"gap-x-2",
	],
	{
		variants: {
			size: {
				small: [
					"text-xs",
					"h-8",
					"rounded-md",
					"text-xs",
					"enabled:active:scale-95",
				],
				medium: [
					"text-sm",
					"h-10",
					"rounded-lg",
					"enabled:active:scale-95",
				],
				large: [
					"text-base",
					"h-14",
					"rounded-lg",
					"enabled:active:scale-95",
				],
			},
			styleType: {
				default: [
					"bg-primary-500",
					"disabled:bg-neutral-100",
					"text-white",
					"drop-shadow-md",
					"shadow-primary-900",
					"enabled:hover:bg-primary-600",
					"enabled:active:bg-primary-700",
					"font-medium",
				],
				outline: [
					"bg-white",
					"disabled:bg-neutral-100",
					"text-neutral-500",
					"border-2",
					"enabled:border-neutral-400",
					"disabled:border-neutral-200",
					"enabled:hover:bg-neutral-100",
					"enabled:active:bg-neutral-200",
					"font-medium",
					"enabled:drop-shadow-md",
					"enabled:shadow-primary-900",
				],
				ghost: [
					"bg-white",
					"text-neutral-500",
					"enabled:hover:bg-neutral-100",
					"enabled:active:bg-neutral-200",
					"font-medium",
				],
				"grayed-out": [
					"bg-neutral-100",
					"disabled:bg-neutral-100",
					"text-neutral-500",
					"enabled:drop-shadow-md",
					"enabled:shadow-primary-900",
					"enabled:hover:bg-neutral-200",
					"enabled:active:bg-primary-100",
					"enabled:active:text-primary-500",
				],
			},
			form: {
				default: [],
				square: ["px-0"],
			},
		},
		compoundVariants: [
			{
				size: "small",
				form: "square",
				className: ["w-8"],
			},
			{
				size: "medium",
				form: "square",
				className: ["w-10"],
			},
			{
				size: "large",
				form: "square",
				className: ["w-14", "rounded-xl"],
			},
			{
				size: "small",
				form: "default",
				className: ["px-2"],
			},
			{
				size: "medium",
				form: "default",
				className: ["px-4"],
			},
			{
				size: "large",
				form: "default",
				className: ["px-8"],
			},
		],
	},
);

export const Button = forwardRef<HTMLButtonElement, DefaultButtonProps>(
	(props, ref) => {
		const {
			title,
			size = "medium",
			styleType = "default",
			iconLeft,
			iconRight,
			...htmlButtonProps
		} = props;

		return (
			<button
				className={button({ size, styleType, form: "default" })}
				ref={ref}
				{...htmlButtonProps}
			>
				{iconLeft && iconLeft({ size: ButtonIconSize[size] })}
				{title}
				{iconRight && iconRight({ size: ButtonIconSize[size] })}
			</button>
		);
	},
);

export const ButtonSquare = forwardRef<HTMLButtonElement, SquareButtonProps>(
	(props, ref) => {
		const {
			size = "medium",
			styleType = "default",
			icon,
			...htmlButtonProps
		} = props;

		return (
			<button
				className={button({ size, styleType, form: "square" })}
				ref={ref}
				{...htmlButtonProps}
			>
				{icon({ size: ButtonIconSize[size] })}
			</button>
		);
	},
);

const ButtonIconSize = {
	small: 16,
	medium: 18,
	large: 24,
};
