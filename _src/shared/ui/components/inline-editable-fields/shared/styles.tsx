import { cva } from "class-variance-authority";

export type ReadViewStyleProps = {
	size?: "large" | "medium";
	textSize?: "large" | "medium";
	compensatedOffset?: boolean;
	maxHeight?: number;
	variant?: "ghost" | "filled";
	width?: "full" | "content";
};

export const readViewStyles = cva(
	["flex", "rounded-lg border-2 border-white", "overflow-hidden"],
	{
		variants: {
			variant: {
				ghost: "",
				filled: "",
			},
			hasValue: {
				true: ["text-neutral-500"],
				false: ["text-neutral-400"],
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
				true: [],
				false: [
					"hover:bg-neutral-100 transition-[background-color] cursor-pointer",
				],
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
				className: "px-2",
			},
			{
				isDisabled: false,
				variant: "filled",
				className:
					"bg-neutral-100 hover:bg-neutral-200 text-neutral-500",
			},
		],
	},
);

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
