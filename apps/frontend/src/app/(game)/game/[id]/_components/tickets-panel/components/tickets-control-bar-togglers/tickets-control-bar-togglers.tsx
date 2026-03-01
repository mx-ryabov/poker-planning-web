import { SearchIcon } from "@/src/shared/ui/components/icon/svg/search.icon";
import { Button } from "@/src/shared/ui/components/button";
import { FilterIcon, SortIcon } from "@/src/shared/ui/components/icon";
import { useTicketsControlBarTogglers } from "./tickets-control-bar-togglers.provider";
import { cva } from "class-variance-authority";
import { useTicketsFilter } from "../tickets-filter";
import { twMerge } from "tailwind-merge";

export function TicketsControlBarTogglers() {
	const { barTogglersState, setShowSorting, setShowFilter, setShowSearch } =
		useTicketsControlBarTogglers();

	const { filterValue } = useTicketsFilter();

	const selectiveFiltersAppliedCount = Object.values(
		filterValue.selectiveFilters,
	).filter((v) => v !== undefined).length;

	const searchApplied = !!filterValue.textFilters.text?.length;

	return (
		<div className="flex flex-row gap-3">
			<Button
				variant="outline"
				shape="square"
				size="small"
				data-testid="tickets-sorting-toggle"
				className={togglerButtonStyles({
					active: barTogglersState.sorting,
				})}
				onClick={() => setShowSorting(!barTogglersState.sorting)}
			>
				<SortIcon size={16} thikness="regular" />
			</Button>
			<Button
				variant="outline"
				shape="square"
				size="small"
				data-testid="tickets-filter-toggle"
				className={togglerButtonStyles({
					active: barTogglersState.filter,
				})}
				onClick={() => setShowFilter(!barTogglersState.filter)}
			>
				<FilterIcon size={16} thikness="regular" />
				{selectiveFiltersAppliedCount > 0 && (
					<span
						data-testid="tickets-filter-count-badge"
						className={twMerge(
							badgeStyles,
							"-top-2 -right-2 text-[11px] text-white w-4 h-4",
						)}
					>
						{selectiveFiltersAppliedCount}
					</span>
				)}
			</Button>
			<Button
				variant="outline"
				shape="square"
				size="small"
				data-testid="tickets-search-toggle"
				className={togglerButtonStyles({
					active: barTogglersState.search,
				})}
				onClick={() => setShowSearch(!barTogglersState.search)}
			>
				<SearchIcon size={16} thikness="regular" />
				{searchApplied && (
					<span
						data-testid="tickets-search-indicator"
						className={twMerge(
							badgeStyles,
							"-top-1 -right-1 w-2 h-2",
						)}
					></span>
				)}
			</Button>
		</div>
	);
}

const badgeStyles =
	"border bg-primary-500 rounded-full flex items-center justify-center absolute border-primary-500";

const togglerButtonStyles = cva(
	"border-neutral-300 transition-all relative box-border",
	{
		variants: {
			active: {
				true: "border-1 border-primary-100 text-primary-700 bg-primary-100 hover:bg-primary-100",
			},
		},
	},
);
