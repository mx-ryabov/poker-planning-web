import { FilterByType } from "./filter-by-type";
import { FilterByStatus } from "./filter-by-status";
import { Button } from "@/src/shared/ui/components/button";
import { useTicketsFilter } from "../tickets-filter.provider";

export function TicketsSelectiveFilters() {
	const { resetSelectiveFilters, filterValue } = useTicketsFilter();
	const areSelectiveFiltersApplied =
		filterValue.selectiveFilters &&
		Object.keys(filterValue.selectiveFilters).length > 0;

	return (
		<div className="flex flex-row gap-2 justify-between w-full min-w-fit">
			<div className="flex flex-row gap-2">
				<FilterByType />
				<FilterByStatus />
			</div>
			{areSelectiveFiltersApplied && (
				<Button
					className="h-6 text-xs px-2"
					variant="ghost"
					onClick={resetSelectiveFilters}
					data-testid="tickets-selective-filters-reset-button"
				>
					Reset
				</Button>
			)}
		</div>
	);
}
