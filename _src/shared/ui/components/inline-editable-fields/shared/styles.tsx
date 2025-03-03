import { cva } from "class-variance-authority";

export type ReadViewStyleProps = {
	size?: "large" | "medium";
	textSize?: "large" | "medium";
	compensatedOffset?: boolean;
	maxHeight?: number;
};

export const readViewStyles = cva(
	[
		"flex",
		"rounded-lg border-2 border-white",
		"whitespace-pre-line box-content overflow-hidden",
		"hover:bg-neutral-100 transition-[background-color]",
	],
	{
		variants: {
			hasValue: {
				true: ["text-neutral-500"],
				false: ["text-neutral-200"],
			},
			size: {
				large: [],
				medium: [],
			},
			fieldType: {
				input: ["truncate"],
				textarea: ["py-2"],
			},
			textSize: {
				large: "text-lg",
				medium: "text-sm",
			},
			compensatedOffset: {
				true: "px-2 -mx-2",
				false: "",
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
				className: "px-3",
			},
			{
				fieldType: "textarea",
				compensatedOffset: false,
				className: "px-2",
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
