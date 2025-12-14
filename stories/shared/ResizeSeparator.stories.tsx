import { ResizeSeparator } from "@/_src/shared/ui/components/resize-separator";
import type { Meta } from "@storybook/nextjs";
import { useRef } from "react";

const meta = {
	title: "Shared/ResizeSeparator",
	component: ResizeSeparator,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof ResizeSeparator>;

export default meta;

export const ResizeSeparatorVerticalForLeftElement = () => {
	const resizableElementRef = useRef<HTMLDivElement>(null);
	return (
		<div className="flex flex-row w-full h-screen">
			<div className="bg-neutral-100" ref={resizableElementRef}>
				Some content
			</div>
			<ResizeSeparator
				orientation="vertical"
				direction="right/bottom"
				resizableElementRef={resizableElementRef}
			/>
			<div className="bg-neutral-200 flex-1"></div>
		</div>
	);
};

export const ResizeSeparatorVerticalForRightElement = () => {
	const resizableElementRef = useRef<HTMLDivElement>(null);
	return (
		<div className="flex flex-row w-full h-screen">
			<div className="bg-neutral-200 flex-1"></div>
			<ResizeSeparator
				orientation="vertical"
				direction="left/top"
				resizableElementRef={resizableElementRef}
			/>
			<div className="bg-neutral-100" ref={resizableElementRef}>
				Some content
			</div>
		</div>
	);
};

export const ResizeSeparatorHorizontalForTopElement = () => {
	const resizableElementRef = useRef<HTMLDivElement>(null);
	return (
		<div className="flex flex-col w-full h-screen">
			<div className="bg-neutral-100" ref={resizableElementRef}>
				Some content
			</div>
			<ResizeSeparator
				orientation="horizontal"
				direction="right/bottom"
				resizableElementRef={resizableElementRef}
			/>
			<div className="bg-neutral-200 flex-1"></div>
		</div>
	);
};

export const ResizeSeparatorHorizontalForBottomElement = () => {
	const resizableElementRef = useRef<HTMLDivElement>(null);
	return (
		<div className="flex flex-col w-full h-screen">
			<div className="bg-neutral-200 flex-1"></div>
			<ResizeSeparator
				orientation="horizontal"
				direction="left/top"
				resizableElementRef={resizableElementRef}
			/>
			<div className="bg-neutral-100" ref={resizableElementRef}>
				Some content
			</div>
		</div>
	);
};
