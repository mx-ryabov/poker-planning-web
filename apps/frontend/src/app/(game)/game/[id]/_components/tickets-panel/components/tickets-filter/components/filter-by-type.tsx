import { TicketType } from "@/src/domain/entities/game/models/game-ticket";
import {
	TicketBugIcon,
	TicketStoryIcon,
	TicketTaskIcon,
} from "@/src/shared/ui/components/icon";
import { FilterSelector } from "./filter-selector";
import { useTicketsFilter } from "../tickets-filter.provider";

const TYPE_OPTIONS = [
	{
		id: TicketType.Bug,
		label: "Bug",
		icon: <TicketBugIcon className="text-error-600" size={12} />,
	},
	{
		id: TicketType.Story,
		label: "Story",
		icon: <TicketStoryIcon className="text-success-600" size={12} />,
	},
	{
		id: TicketType.Task,
		label: "Task",
		icon: <TicketTaskIcon className="text-info-600" size={12} />,
	},
];

export function FilterByType() {
	const { filterValue, setSelectiveFilters } = useTicketsFilter();
	return (
		<FilterSelector
			options={TYPE_OPTIONS}
			data-testid="tickets-filter-by-type"
			onChange={(option) =>
				setSelectiveFilters((prevValue) => ({
					...prevValue,
					type: option?.id,
				}))
			}
			selectedOptionId={filterValue.selectiveFilters?.type}
			renderOption={(option) => (
				<>
					{option.icon} {option.label}
				</>
			)}
			renderSelected={(selected) => (
				<>
					{selected?.icon} {selected?.label || "Type"}
				</>
			)}
		/>
	);
}
