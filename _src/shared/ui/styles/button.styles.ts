import { cva } from "class-variance-authority";

export type ButtonStylesProps = {
	size?: "small" | "medium" | "large";
	variant?: "default" | "outline" | "ghost" | "grayed-out";
};

export const buttonStyles = cva(
	[
		"transition-all",
		"duration-150",
		"flex",
		"justify-center",
		"items-center",
		"gap-x-2",
		"w-fit",
	],
	{
		variants: {
			size: {
				small: [
					"text-xs",
					"min-h-8",
					"max-h-8",
					"rounded-md",
					"text-xs",
				],
				medium: ["text-sm", "h-10", "rounded-lg"],
				large: ["text-base", "h-14", "rounded-lg"],
			},
			variant: {
				default: [
					"bg-primary-500",
					"text-white",
					"drop-shadow-md",
					"shadow-primary-900",
					"font-medium",
				],
				outline: [
					"bg-white",
					"text-neutral-500",
					"border-2",
					"border-neutral-400",

					"font-medium",
					"drop-shadow-md",
					"shadow-primary-900",
				],
				ghost: ["bg-white", "text-neutral-500", "font-medium"],
				"grayed-out": [
					"bg-neutral-100",
					"text-neutral-500",
					"drop-shadow-md",
					"shadow-primary-900",
				],
			},
			form: {
				default: [],
				square: ["px-0"],
			},
			isPressed: {
				true: [],
			},
			isDisabled: {
				true: ["drop-shadow-none"],
				false: [],
			},
			isHovered: {
				true: [],
			},
			excludeFromFocus: {
				true: ["outline-none!"],
				false: [],
			},
			isFocused: {
				true: ["outline-primary-500", "outline-offset-2"],
				false: ["outline-none"],
			},
		},
		compoundVariants: [
			// Default
			{
				isHovered: true,
				variant: "default",
				className: ["bg-primary-600"],
			},
			{
				isPressed: true,
				variant: "default",
				className: ["bg-primary-700"],
			},
			{
				isDisabled: true,
				variant: "default",
				className: ["bg-neutral-100", "text-neutral-300"],
			},
			// Outline
			{
				isHovered: true,
				variant: "outline",
				className: ["bg-neutral-100"],
			},
			{
				isPressed: true,
				variant: "outline",
				className: ["bg-neutral-200"],
			},
			{
				isDisabled: true,
				variant: "outline",
				className: [
					"bg-neutral-100",
					"border-neutral-200",
					"text-neutral-300",
				],
			},
			// Ghost
			{
				isHovered: true,
				variant: "ghost",
				className: ["bg-neutral-100"],
			},
			{
				isPressed: true,
				variant: "ghost",
				className: ["bg-neutral-200"],
			},
			{
				isDisabled: true,
				variant: "ghost",
				className: ["text-neutral-300"],
			},
			// Grayed Out
			{
				isHovered: true,
				variant: "grayed-out",
				className: ["bg-neutral-200"],
			},
			{
				isPressed: true,
				variant: "grayed-out",
				className: ["bg-primary-100", "text-primary-500"],
			},
			{
				isDisabled: true,
				variant: "grayed-out",
				className: ["bg-neutral-100", "text-neutral-300"],
			},
			// Square
			{
				size: "small",
				form: "square",
				className: ["min-w-8", "max-w-8"],
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
