import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	ChartEvent,
	ActiveElement,
	TooltipModel,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
	selectPreliminaryVotingResults,
	useGameState,
} from "@/_src/pages/game-room/model";
import { GameVote } from "@/_src/shared/api/game-api";
import { ChartTooltip } from "./chart-tooltip";
import { usePokerFieldAction } from "../../poker-field-provider";
import debounce from "lodash.debounce";

ChartJS.register(ArcElement, Tooltip);

export function ResultsChart() {
	const chartTooltipRef = useRef<HTMLDivElement | null>(null);
	const results = useGameState(selectPreliminaryVotingResults);
	const chartData = useMemo(() => getChartData(results), [results]);
	const { hoveredGroupIndex, onHover } = useChartPieceHover({
		dataVoteIds: chartData.dataVoteIds,
	});

	return (
		<div className="relative flex flex-row items-center gap-8">
			<div className="relative h-[200px] w-[200px]">
				<Doughnut
					options={{
						cutout: "75%",
						plugins: {
							tooltip: {
								enabled: false,
								position: "nearest",
								external: tooltipManager({
									chartTooltipRef,
									labelCountMap: chartData.dataMap,
									votesCount: results.length,
								}),
							},
						},
						onHover,
					}}
					data={{
						labels: chartData.labels,

						datasets: [
							{
								data: chartData.data,
								circumference: 240,
								borderRadius: 12,
								rotation: -120,
								offset: 15,
								hoverBackgroundColor: (ctx) => {
									const index = ctx.dataIndex;
									if (hoveredGroupIndex === null) {
										return CHART_ACTIVE_HOVER_COLORS[index];
									}
									if (hoveredGroupIndex === index) {
										return CHART_ACTIVE_COLORS[index];
									}
									return CHART_INACTIVE_HOVER_COLORS[index];
								},
								backgroundColor: (ctx) => {
									const index = ctx.dataIndex;
									if (hoveredGroupIndex === null) {
										return CHART_ACTIVE_COLORS[index];
									}
									if (hoveredGroupIndex === index) {
										return CHART_ACTIVE_COLORS[index];
									}
									return CHART_INACTIVE_COLORS[index];
								},
							},
						],
					}}
					aria-label="Results chart"
				/>
				<ChartTooltip ref={chartTooltipRef} />

				<div className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-2">
					{chartData.mostPopularLabel !== null && (
						<>
							<div className="pt-6 text-xl font-bold text-neutral-900">
								{chartData.mostPopularLabel}
							</div>
							<div className="text-center text-xs font-medium text-neutral-700">
								Recommended
								<br />
								Estimation
							</div>
						</>
					)}
					{chartData.mostPopularLabel === null && (
						<div className="flex flex-col items-center gap-1 font-medium text-neutral-900">
							<span className="text-lg font-bold">
								Rebellion!
							</span>
							<span className="text-center text-sm">
								Nobody voted 😲
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-row gap-6 rounded-2xl bg-neutral-100 px-8 py-4">
				{chartData.labelCountEntries.map((entry, ind) => (
					<div className="flex flex-col items-center gap-2" key={ind}>
						<span className="text-lg text-neutral-900">
							{entry[0]}
						</span>
						<span className="text-xs text-neutral-900">
							{entry[1]} times
						</span>
						<div
							className="h-[18px] w-[50px] rounded-full"
							style={{
								backgroundColor: chartData.backgroundColor[ind],
							}}
						></div>
					</div>
				))}
			</div>
		</div>
	);
}

type TooltipManagerParams = {
	chartTooltipRef: RefObject<HTMLDivElement | null>;
	labelCountMap: Map<string, number>;
	votesCount: number;
};

function tooltipManager(params: TooltipManagerParams) {
	const { chartTooltipRef, labelCountMap, votesCount } = params;

	return (context: { chart: ChartJS; tooltip: TooltipModel<"doughnut"> }) => {
		const { chart, tooltip } = context;

		const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

		const tooltipEl = chartTooltipRef.current;
		if (!tooltipEl) return;

		const labelEl = tooltipEl.querySelector("#label");
		const voutedForCountEl = tooltipEl.querySelector("#voutedForCount");
		const voutedCountEl = tooltipEl.querySelector("#voutedCount");

		if (tooltip.opacity === 0) {
			if (labelEl) labelEl.innerHTML = "";
			if (voutedForCountEl) voutedForCountEl.innerHTML = "";
			if (voutedCountEl) voutedCountEl.innerHTML = "";
			tooltipEl.style.display = "none";
			return;
		}
		tooltipEl.style.display = "block";

		const label = tooltip.title[0];
		if (labelEl) labelEl.innerHTML = label;
		if (voutedForCountEl)
			voutedForCountEl.innerHTML = `${labelCountMap.get(label) || 0}`;
		if (voutedCountEl) voutedCountEl.innerHTML = `${votesCount}`;

		tooltipEl.style.left = positionX + tooltip.caretX + "px";
		tooltipEl.style.top = positionY + tooltip.caretY + "px";
	};
}

type UseChartPieceHoverProps = {
	dataVoteIds: (string | null)[];
};

function useChartPieceHover({ dataVoteIds }: UseChartPieceHoverProps) {
	const { setHighlightedVoteId } = usePokerFieldAction();
	const [hoveredGroupIndex, setHoveredGroupIndex] = useState<number | null>(
		null,
	);

	const setHoveredGroupIndexMemoized = useCallback(() => {
		let lastInd: number | null = null;

		return (ind: number | null) => {
			if (lastInd !== ind) {
				setHoveredGroupIndex(ind);
				const newHighlightedVoteId =
					ind !== null ? dataVoteIds[ind] : undefined;
				setHighlightedVoteId(newHighlightedVoteId);
				lastInd = ind;
			}
		};
	}, [dataVoteIds, setHighlightedVoteId]);

	const setHoveredGroupIndexDebounced = useMemo(
		() => debounce(setHoveredGroupIndexMemoized(), 60),
		[setHoveredGroupIndexMemoized],
	);

	const onHover = useCallback(
		(_: ChartEvent, elements: ActiveElement[]) => {
			const groupIndex = elements.length === 0 ? null : elements[0].index;
			setHoveredGroupIndexDebounced(groupIndex);
		},
		[setHoveredGroupIndexDebounced],
	);

	return {
		hoveredGroupIndex,
		onHover,
	};
}

function getChartData(results: (GameVote | null)[]) {
	const data: Map<string, number> = new Map();
	const dataVoteIds: (string | null)[] = [];
	const uniqueSelectedVotes: GameVote[] = [];
	let mostPopularLabel = null;
	let mostPopularLabelsCount = 0;

	results
		.toSorted((a, b) => {
			if (a === null || b === null) {
				return -1;
			}
			return b.order - a.order;
		})
		.forEach((r) => {
			let label = getLabelForVote(r);

			const count = (data.get(label) || 0) + 1;
			if (count === 1) {
				dataVoteIds.push(r?.id || null);
				if (r) uniqueSelectedVotes.push(r);
			}
			if (count > mostPopularLabelsCount && r !== null) {
				mostPopularLabel = label;
				mostPopularLabelsCount = count;
			}
			data.set(label, count);
		});

	return {
		labels: Array.from(data.keys()),
		data: Array.from(data.values()),
		backgroundColor: CHART_ACTIVE_COLORS.slice(0, data.size),
		labelCountEntries: Array.from(data.entries()),
		dataMap: data,
		dataVoteIds,
		mostPopularLabel,
		mostPopularLabelsCount,
		uniqueSelectedVotes,
	};
}

function getLabelForVote(vote: GameVote | null) {
	if (vote === null) {
		return "Not voted";
	}
	return `${vote.suit} ${vote.value}`;
}

const CHART_ACTIVE_COLORS = [
	"#845ec2",
	"#59b25c",
	"#5272C5",
	"#85828a",
	"#C34A4A",
	"#b7b349",
];

const CHART_ACTIVE_HOVER_COLORS = [
	"#714bad",
	"#439646",
	"#4964a9",
	"#1d1824",
	"#a74747",
	"#9b9735",
];

const CHART_INACTIVE_COLORS = [
	"#d7c4f7",
	"#b3edb5",
	"#c2d0f5",
	"#c1c0c4",
	"#f1bebe",
	"#f1eea8",
];

const CHART_INACTIVE_HOVER_COLORS = [
	"#c5a8f4",
	"#93df96",
	"#9bb1e9",
	"#85828a",
	"#e39797",
	"#e1de80",
];
