import { cva } from "class-variance-authority";
import { RefObject } from "react";
import { Button } from "react-aria-components";
import { ArrowRightSimpleIcon } from "../../icon";
import { ResizeSeparator } from "../../resize-separator";

const collapseBtnStyles = cva(
	[
		"flex items-center justify-center",
		"absolute",
		"w-8 h-8",
		"border-2 border-neutral-300 rounded-full",
		"hover:border-primary-600 active:border-primary-700",
		"bg-white text-neutral-400",
		"hover:text-primary-600 active:text-primary-700",
		"outline-hidden transition-colors",
		"cursor-pointer",
	],
	{
		variants: {
			orientation: {
				vertical: ["-left-4 top-1/2 -translate-y-1/2"],
				horizontal: ["-top-4 left-1/2 -translate-x-1/2", "rotate-90"],
			},
		},
	},
);

type SeparatorProps = {
	position: "start" | "end";
	contentRef: RefObject<HTMLDivElement | null>;
	onResizeEnd: (width: number) => void;
	onCollapse: () => void;
};

export function Separator({
	position,
	contentRef,
	onResizeEnd,
	onCollapse,
}: SeparatorProps) {
	const direction = position === "start" ? "right/bottom" : "left/top";
	return (
		<div className="relative z-10 h-full" data-testid="drawer-separator">
			<ResizeSeparator
				orientation="vertical"
				direction={direction}
				onChangeEnd={onResizeEnd}
				resizableElementRef={contentRef}
			/>
			<Button
				className={collapseBtnStyles({ orientation: "vertical" })}
				aria-label="Collapse drawer"
				onPress={onCollapse}
			>
				<ArrowRightSimpleIcon size={14} thikness="bold" />
			</Button>
		</div>
	);
}
