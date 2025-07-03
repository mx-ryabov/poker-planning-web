import { RefObject } from "react";

type Props = {
	ref?: RefObject<HTMLDivElement | null>;
};

export function ChartTooltip({ ref }: Props) {
	return (
		<div
			className="pointer-events-none absolute z-50 flex w-max flex-col gap-2 rounded-sm bg-neutral-900 px-4 py-3 text-white"
			style={{ display: "none" }}
			ref={ref}
		>
			<div className="flex flex-row items-center gap-4">
				<span id="label" className="text-sm"></span>
				<span>-</span>
				<div className="font-bold">
					<span id="voutedForCount"></span>/
					<span id="voutedCount"></span>
				</div>
			</div>
		</div>
	);
}
