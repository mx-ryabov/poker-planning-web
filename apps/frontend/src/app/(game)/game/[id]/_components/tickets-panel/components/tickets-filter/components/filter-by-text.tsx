import { SearchIcon } from "@/src/shared/ui/components/icon/svg/search.icon";
import { Input } from "@/src/shared/ui/components/input";
import { useTicketsFilter } from "../tickets-filter.provider";
import { Button } from "@/src/shared/ui/components/button";
import { CloseIcon } from "@/src/shared/ui/components/icon";

export function TicketsTextFilter() {
	const { filterValue, setTextFilters, resetTextFilters } =
		useTicketsFilter();

	return (
		<Input
			placeholder="Search"
			startIcon={SearchIcon}
			label=""
			className="w-full border-[1.5px]"
			value={filterValue.textFilters.text}
			onChange={(text) =>
				setTextFilters((prevValue) => ({
					...prevValue,
					text,
				}))
			}
			data-testid="tickets-text-filter-input"
			endContent={
				<Button
					variant="ghost"
					size="small"
					shape="square"
					aria-label="Clear text filter"
					excludeFromTabOrder={true}
					onPress={resetTextFilters}
					isDisabled={!filterValue.textFilters.text?.length}
					data-testid="tickets-text-filter-clear-button"
				>
					<CloseIcon size={16} />
				</Button>
			}
		/>
	);
}
