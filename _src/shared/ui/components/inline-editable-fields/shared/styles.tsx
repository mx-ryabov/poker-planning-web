import { cva } from "class-variance-authority";

export type ReadViewStyleProps = {
	size?: "large" | "medium";
	textSize?: "large" | "medium";
	compensatedOffset?: boolean;
	maxHeight?: number;
	variant?: "ghost" | "filled" | "bordered";
	width?: "full" | "content";
};

export const readViewStyles = cva(["flex", "rounded-lg", "overflow-hidden"], {
	variants: {
		variant: {
			ghost: "border-2 border-white",
			filled: "border-2 border-white",
			bordered: "border-2 border-neutral-300",
		},
		hasValue: {
			true: ["text-neutral-900"],
			false: ["text-neutral-600"],
		},
		size: {
			large: [],
			medium: [],
		},
		fieldType: {
			input: ["truncate box-border"],
			textarea: ["box-content py-2 whitespace-pre-line break-all"],
		},
		textSize: {
			large: "text-lg",
			medium: "text-sm",
		},
		compensatedOffset: {
			true: "px-2 -mx-2",
			false: "",
		},
		isDisabled: {
			true: ["cursor-not-allowed"],
			false: ["transition-all cursor-pointer"],
		},
	},
	compoundVariants: [
		{
			fieldType: "input",
			size: "large",
			className: ["h-10"],
		},
		{
			fieldType: "input",
			size: "medium",
			className: ["h-8"],
		},
		{
			fieldType: "input",
			compensatedOffset: false,
			className: "px-3 items-center",
		},
		{
			fieldType: "textarea",
			compensatedOffset: false,
			className: "px-3",
		},
		{
			isDisabled: false,
			variant: "filled",
			className: "bg-neutral-200 hover:bg-neutral-300 text-neutral-900",
		},
		{
			isDisabled: false,
			variant: "bordered",
			className: "hover:border-primary-500",
		},
	],
});

export type EditorViewStyleProps = {
	textSize?: "large" | "medium";
	size?: "large" | "medium";
	compensatedOffset?: boolean;
	maxHeight?: number;
};

export const editorViewStyles = cva([""], {
	variants: {
		size: {
			medium: ["h-8"],
			large: [],
		},
		textSize: {
			large: "text-lg",
			medium: "text-sm",
		},
		compensatedOffset: {
			true: "px-2",
			false: "",
		},
	},
});
