import { cva } from "class-variance-authority";

export const overlayStyles = cva("", {
	variants: {
		type: {
			overlay: ["fixed top-0 left-0 w-screen h-screen bg-neutral-900/50"],
			inline: ["bg-opacity-0"],
		},
		position: {
			start: ["flex flex-row h-full"],
			end: ["flex flex-row h-full"],
			bottom: [],
		},
	},
	compoundVariants: [
		{
			type: "inline",
			position: "start",
			className: ["h-full order-first"],
		},
		{
			type: "inline",
			position: "end",
			className: ["h-full"],
		},
		{
			type: "inline",
			position: "bottom",
			className: ["w-full"],
		},
	],
});

export const modalStyles = cva("", {
	variants: {
		type: {
			overlay: ["absolute"],
			inline: ["bg-opacity-0"],
		},
		position: {
			start: [
				"data-entering:animate-left-right-fade-in data-exiting:animate-left-right-fade-in-reverse",
			],
			end: [
				"data-entering:animate-right-left-fade-in data-exiting:animate-right-left-fade-in-reverse",
			],
			bottom: [
				"data-entering:animate-bottom-up-fade-in data-exiting:animate-bottom-up-fade-in-reverse",
			],
		},
	},
	compoundVariants: [
		// Overlay
		{
			type: "overlay",
			position: "start",
			className: ["left-0 top-0", "h-full"],
		},
		{
			type: "overlay",
			position: "end",
			className: ["right-0 top-0", "h-full"],
		},
		{
			type: "overlay",
			position: "bottom",
			className: ["left-0 bottom-0", "w-full"],
		},
	],
});

export const dialogStyles = cva("w-full h-full flex outline-hidden", {
	variants: {
		orientation: {
			vertical: ["flex-row"],
			horizontal: ["flex-col"],
		},
	},
});

export const contentDefaultStyles = cva("shadow-lg bg-white w-max", {
	variants: {
		position: {
			start: ["rounded-r-xl"],
			end: ["rounded-l-xl"],
		},
	},
});
