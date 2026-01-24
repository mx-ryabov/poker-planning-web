import { FilterSelector } from "./filter-selector";
import { useTicketsFilter } from "../tickets-filter.provider";
import { TicketsFilterByStatusValue } from "../types";

const STATUS_OPTIONS: { id: TicketsFilterByStatusValue; label: string }[] = [
	{
		id: "estimated",
		label: "Estimated",
	},
	{
		id: "unestimated",
		label: "Not estimated",
	},
];

export function FilterByStatus() {
	const { filterValue, setSelectiveFilters } = useTicketsFilter();
	return (
		<FilterSelector
			options={STATUS_OPTIONS}
			data-testid="tickets-filter-by-status"
			renderOption={(option) => option.label}
			renderSelected={(selected) => selected?.label || "Status"}
			onChange={(option) =>
				setSelectiveFilters((prevValue) => ({
					...prevValue,
					status: option?.id,
				}))
			}
			selectedOptionId={filterValue.selectiveFilters?.status}
		/>
	);
}
