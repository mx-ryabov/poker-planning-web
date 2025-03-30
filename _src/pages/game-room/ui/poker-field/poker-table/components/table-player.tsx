import { StringHelper } from "@/_src/shared/lib/utils";
import { cva } from "class-variance-authority";
import { useMemo } from "react";
import { CardFaceDownSvg } from "./card-face-down-svg";

type Props = {
	name: string;
	isCurrentPlayer: boolean;
	status: "thinking" | "ready" | "revealed";
	tablePosition: "top" | "right" | "bottom" | "left";
};

export function TablePlayer(props: Props) {
	const { name, isCurrentPlayer, status, tablePosition } = props;

	const initials = useMemo(() => {
		return StringHelper.getFirstLetters(name, 2).toUpperCase();
	}, [name]);

	return (
		<div className="relative h-10 w-10">
			<div className="absolute inset-0 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white bg-neutral-100 text-base text-neutral-500 drop-shadow-sm">
				{isCurrentPlayer ? "You" : initials}
			</div>
			<div className={nameStyles({ tablePosition })}>{name}</div>
			<div className={statusStyles({ tablePosition })}>
				{status === "ready" && (
					<div className="p-2">
						<CardFaceDownSvg />
					</div>
				)}
				{status === "thinking" && (
					<div className={thinkingStatusStyles({ tablePosition })}>
						<div className="bg-primary-500 h-1 w-1 animate-[simple-ping_linear_1s_infinite] rounded-full"></div>
						<div className="bg-primary-500 h-1 w-1 animate-[simple-ping_linear_2s_infinite] rounded-full"></div>
						<div className="bg-primary-500 h-1 w-1 animate-[simple-ping_linear_3s_infinite] rounded-full"></div>
					</div>
				)}
				{status === "revealed" && (
					<div className="p-5">
						<div className="bg-primary-500 border-primary-100 text-primary-100 flex h-8 w-6 items-center justify-center rounded-sm border-2 text-base">
							13
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

const nameStyles = cva(["text-center text-xs text-neutral-500", "absolute"], {
	variants: {
		tablePosition: {
			top: "top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2",
			right: "right-0 top-1/2 -translate-y-1/2 translate-x-full pl-2",
			bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2",
			left: "left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2",
		},
	},
});

const statusStyles = cva(["absolute"], {
	variants: {
		tablePosition: {
			top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
			left: "right-0 top-1/2 -translate-y-1/2 translate-x-full",
			bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
			right: "left-0 top-1/2 -translate-y-1/2 -translate-x-full",
		},
	},
});

const thinkingStatusStyles = cva(["flex gap-1 p-1"], {
	variants: {
		tablePosition: {
			top: "flex-row",
			left: "flex-col",
			bottom: "flex-row",
			right: "flex-col",
		},
	},
});
