import { useLocalStorageState } from "@/src/shared/lib";
import { SortingId } from "./tickets-sorting.types";
import { createContext, useContext } from "react";

export type TicketsSortingContextValue = {
	sorting: SortingId;
	setSorting: (sorting: SortingId) => void;
};
export const TicketsSortingContext = createContext<TicketsSortingContextValue>(
	null!,
);

export function TicketsSortingProvider({
	children,
	persistedKey,
}: {
	children: React.ReactNode;
	persistedKey: string;
}) {
	const [sorting, setSorting] = useLocalStorageState<SortingId>(
		`tickets-sorting-${persistedKey}`,
		{
			defaultValue: "newest",
			syncWithStorage: true,
		},
	);

	return (
		<TicketsSortingContext.Provider value={{ sorting, setSorting }}>
			{children}
		</TicketsSortingContext.Provider>
	);
}

export function useTicketsSorting() {
	const context = useContext(TicketsSortingContext);
	if (context === undefined) {
		throw new Error(
			"useTicketsSorting must be within TicketsSortingProvider",
		);
	}
	return context;
}
