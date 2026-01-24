import { Button } from "@/src/shared/ui/components/button";
import { SortIcon } from "@/src/shared/ui/components/icon";
import { Menu } from "@/src/shared/ui/components/menu";
import { useCallback } from "react";
import { Key } from "react-stately";
import { SortingGroup, SortingId } from "./tickets-sorting.types";
import { useTicketsSorting } from "./tickets-sorting.provider";

const SORTING_DATA: SortingGroup[] = [
	// TODO: Add CreatedAt field for Tickets on backend and add this sorting option
	{
		id: "freshness",
		label: "Freshness",
		options: [
			{
				id: "newest",
				label: "Newest",
			},
			{
				id: "oldest",
				label: "Oldest",
			},
		],
	},
	{
		id: "estimation",
		label: "Estimation",
		options: [
			{
				id: "lowest-to-highest",
				label: "Low to high",
			},
			{
				id: "highest-to-lowest",
				label: "High to low",
			},
		],
	},
];

const SORTING_OPTIONS = SORTING_DATA.map((group) => group.options).flat();

export function TicketsSorting() {
	const { sorting, setSorting } = useTicketsSorting();

	const selectedOption = SORTING_OPTIONS.find(
		(option) => option.id === sorting,
	);

	const onSelectionChange = useCallback(
		(keys: Iterable<Key>) => {
			const key = Array.from(keys)[0];
			setSorting(key as SortingId);
		},
		[setSorting],
	);

	return (
		<Menu>
			<Button
				variant="ghost"
				className="h-6 text-xs px-2"
				data-testid="tickets-sorting-trigger"
			>
				<span className="flex flex-row gap-1 items-center">
					<SortIcon size={14} />
					{selectedOption?.label}
				</span>
			</Button>
			<Menu.Content
				items={SORTING_DATA}
				selectionMode="single"
				disallowEmptySelection={true}
				selectedKeys={[sorting]}
				onSelectionChange={onSelectionChange}
				className="p-0.5 min-w-[50px]"
			>
				{(group) => (
					<Menu.Section
						key={group.id}
						title={group.label}
						items={group.options}
					>
						{(option) => (
							<Menu.Item
								key={option.id}
								id={option.id}
								data-testid={`tickets-sorting-option-${option.id}`}
								className="py-1 text-sm"
							>
								{option.label}
							</Menu.Item>
						)}
					</Menu.Section>
				)}
			</Menu.Content>
		</Menu>
	);
}
