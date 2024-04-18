import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IconType } from "../icon/icon-builder";
import { Color } from "../colors";

type HtmlButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;
type Props = HtmlButtonProps & {
	title: string;
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	styleType?: "default" | "outline" | "ghost" | "grayed-out";
	form?: "default" | "square";
	iconLeft?: IconType;
	iconRight?: IconType;
};

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
					"px-2",
					"rounded-md",
					"text-xs",
					"enabled:active:scale-95",
				],
				medium: [
					"text-sm",
					"h-10",
					"px-4",
					"rounded-lg",
					"enabled:active:scale-95",
				],
				large: [
					"text-base",
					"h-14",
					"px-8",
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
		],
	},
);

export function Button(props: Props) {
	const {
		title,
		size = "medium",
		disabled = false,
		styleType = "default",
		form = "default",
		iconLeft,
		iconRight,
		...htmlButtonProps
	} = props;

	return (
		<button
			className={button({ size, styleType, form })}
			disabled={disabled}
			{...htmlButtonProps}
		>
			{iconLeft && iconLeft({ size: ButtonIconSize[size] })}
			{form === "default" ? title : null}
			{form === "default" &&
				iconRight &&
				iconRight({ size: ButtonIconSize[size] })}
		</button>
	);
}

const ButtonIconSize = {
	small: 16,
	medium: 18,
	large: 24,
};
