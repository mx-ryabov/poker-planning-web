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
		"border-2 border-neutral-100 rounded-full",
		"hover:border-primary-300 active:border-primary-500",
		"bg-white text-neutral-200",
		"hover:text-primary-300 active:text-primary-500",
		"outline-none transition-colors",
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
	stateKey?: string;
	onCollapse: () => void;
};

export function Separator({
	position,
	contentRef,
	stateKey,
	onCollapse,
}: SeparatorProps) {
	const direction = position === "start" ? "right/bottom" : "left/top";
	return (
		<div className="h-full relative" data-testid="drawer-separator">
			<ResizeSeparator
				orientation="vertical"
				direction={direction}
				stateKey={stateKey}
				resizableElementRef={contentRef}
			/>
			<Button
				className={collapseBtnStyles({ orientation: "vertical" })}
				aria-label="collapse-button"
				onPress={onCollapse}
			>
				<ArrowRightSimpleIcon size={14} thikness="bold" />
			</Button>
		</div>
	);
}
