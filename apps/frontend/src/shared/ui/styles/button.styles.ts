import { cva } from "class-variance-authority";

export type ButtonStylesProps = {
	size?: "small" | "medium" | "large";
	variant?: "default" | "outline" | "ghost" | "grayed-out";
	appearance?:
		| "primary"
		| "secondary"
		| "danger"
		| "warning"
		| "info"
		| "success"
		| "neutral";
};

export const COLOR_SCHEMES = {
	primary: {
		"--main-color": "var(--color-primary-600)",
		"--main-light-color": "var(--color-primary-100)",
		"--hovered-color": "var(--color-primary-700)",
		"--pressed-color": "var(--color-primary-800)",
		"--shadow-color": "var(--color-primary-900)",
		"--text-color": "var(--color-white)",
	},
	secondary: {
		"--main-color": "var(--color-secondary-600)",
		"--main-light-color": "var(--color-secondary-100)",
		"--hovered-color": "var(--color-secondary-700)",
		"--pressed-color": "var(--color-secondary-800)",
		"--shadow-color": "var(--color-secondary-900)",
		"--text-color": "var(--color-white)",
	},
	danger: {
		"--main-color": "var(--color-error-700)",
		"--main-light-color": "var(--color-error-100)",
		"--hovered-color": "var(--color-error-800)",
		"--pressed-color": "var(--color-error-900)",
		"--shadow-color": "var(--color-error-900)",
		"--text-color": "var(--color-white)",
	},
	warning: {
		"--main-color": "var(--color-warning-600)",
		"--main-light-color": "var(--color-warning-100)",
		"--hovered-color": "var(--color-warning-700)",
		"--pressed-color": "var(--color-warning-800)",
		"--shadow-color": "var(--color-warning-900)",
		"--text-color": "var(--color-black)",
	},
	info: {
		"--main-color": "var(--color-info-600)",
		"--main-light-color": "var(--color-info-100)",
		"--hovered-color": "var(--color-info-700)",
		"--pressed-color": "var(--color-info-800)",
		"--shadow-color": "var(--color-info-900)",
		"--text-color": "var(--color-black)",
	},
	success: {
		"--main-color": "var(--color-success-600)",
		"--main-light-color": "var(--color-success-100)",
		"--hovered-color": "var(--color-success-700)",
		"--pressed-color": "var(--color-success-800)",
		"--shadow-color": "var(--color-success-900)",
		"--text-color": "var(--color-black)",
	},
	neutral: {
		"--main-color": "var(--color-neutral-500)",
		"--main-light-color": "var(--color-neutral-100)",
		"--hovered-color": "var(--color-neutral-600)",
		"--pressed-color": "var(--color-neutral-700)",
		"--shadow-color": "var(--color-neutral-900)",
		"--text-color": "var(--color-black)",
	},
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
		// We need all these colors (css variables) to be initialized for COLOR_SCHEMES
		// They won't be applied anyway because of variants
		"text-primary-500 text-primary-100 text-primary-600 text-primary-700 text-primary-800 text-primary-900",
		"text-secondary-500 text-secondary-100 text-secondary-600 text-secondary-700 text-secondary-800 text-secondary-900",
		"text-error-500 text-error-100 text-error-600 text-error-700 text-error-900",
		"text-warning-500 text-warning-100 text-warning-600 text-warning-700 text-warning-900",
		"text-info-500 text-info-100 text-info-600 text-info-700 text-info-900",
		"text-success-500 text-success-100 text-success-600 text-success-700 text-success-900",
		"text-neutral-900 text-neutral-100 text-neutral-600 text-neutral-700 text-neutral-800",
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
				large: ["text-sm md:text-base", "h-13 md:h-14", "rounded-lg"],
			},
			variant: {
				default: [
					"bg-[var(--main-color)]",
					"text-[var(--text-color)]",
					"font-medium",
				],
				outline: [
					"bg-white",
					"text-neutral-900",
					"border",
					"border-neutral-900",
					"font-medium",
				],
				ghost: ["bg-transparent", "text-neutral-900", "font-medium"],
				"grayed-out": ["bg-neutral-200", "text-neutral-900"],
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
				false: ["cursor-pointer"],
			},
			isHovered: {
				true: [],
			},
			excludeFromFocus: {
				true: ["outline-hidden!"],
				false: [],
			},
			isFocused: {
				true: ["outline-[var(--main-color)]", "outline-offset-2"],
				false: ["outline-hidden"],
			},
		},
		compoundVariants: [
			// Default
			{
				isHovered: true,
				variant: "default",
				className: ["bg-[var(--hovered-color)]"],
			},
			{
				isPressed: true,
				variant: "default",
				className: ["bg-[var(--pressed-color)]"],
			},
			{
				isDisabled: true,
				variant: "default",
				className: [
					"bg-neutral-200",
					"text-neutral-600",
					"cursor-not-allowed",
				],
			},
			// Outline
			{
				isHovered: true,
				variant: "outline",
				className: ["bg-neutral-200"],
			},
			{
				isPressed: true,
				variant: "outline",
				className: ["bg-neutral-300"],
			},
			{
				isDisabled: true,
				variant: "outline",
				className: [
					"bg-neutral-100",
					"border-neutral-500",
					"text-neutral-600",
					"cursor-not-allowed",
				],
			},

			// Ghost
			{
				isHovered: true,
				variant: "ghost",
				className: ["bg-neutral-800/20"],
			},
			{
				isPressed: true,
				variant: "ghost",
				className: ["bg-neutral-900/20"],
			},
			{
				isDisabled: true,
				variant: "ghost",
				className: ["text-neutral-500", "cursor-not-allowed"],
			},

			// Grayed Out
			{
				isHovered: true,
				variant: "grayed-out",
				className: ["bg-neutral-300"],
			},
			{
				isPressed: true,
				variant: "grayed-out",
				className: ["bg-neutral-400"],
			},
			{
				isDisabled: true,
				variant: "grayed-out",
				className: [
					"bg-neutral-100",
					"text-neutral-400",
					"cursor-not-allowed",
				],
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
