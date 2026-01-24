import { createContext, startTransition, useCallback, useContext } from "react";
import { TicketsFilterValue, TicketsFilterValueSchema } from "./types";
import {
	SetLocalStorageStateFunction,
	useLocalStorageState,
} from "@/src/shared/lib";

type TicketFilterContextValue = {
	filterValue: TicketsFilterValue;
	setSelectiveFilters: SetLocalStorageStateFunction<
		TicketsFilterValue["selectiveFilters"]
	>;
	resetSelectiveFilters: () => void;
	setTextFilters: SetLocalStorageStateFunction<
		TicketsFilterValue["textFilters"]
	>;
	resetTextFilters: () => void;
};
export const TicketFilterContext = createContext<TicketFilterContextValue>(
	null!,
);

export function useTicketsFilter() {
	const context = useContext(TicketFilterContext);
	if (context === undefined) {
		throw new Error(
			"useTicketsFilter must be within TicketsFilterProvider",
		);
	}
	return context;
}

const DEFAULT_FILTER_VALUE: TicketsFilterValue = {
	textFilters: {
		text: "",
	},
	selectiveFilters: {
		type: undefined,
		status: undefined,
	},
};

export function TicketsFilterProvider({
	children,
	persistedKey,
}: {
	children: React.ReactNode;
	persistedKey: string;
}) {
	const [filterValue, setFilterValue] =
		useLocalStorageState<TicketsFilterValue>(
			`tickets-filter-${persistedKey}`,
			{
				defaultValue: DEFAULT_FILTER_VALUE,
				syncWithStorage: true,
				schema: TicketsFilterValueSchema,
			},
		);

	const setSelectiveFilters: SetLocalStorageStateFunction<
		TicketsFilterValue["selectiveFilters"]
	> = useCallback(
		(newValue) => {
			startTransition(() => {
				setFilterValue((prev) => ({
					...DEFAULT_FILTER_VALUE,
					...prev,
					selectiveFilters:
						typeof newValue === "function"
							? newValue(prev?.selectiveFilters)
							: newValue,
				}));
			});
		},
		[setFilterValue],
	);

	const resetSelectiveFilters = useCallback(() => {
		setFilterValue((prev) => ({
			...DEFAULT_FILTER_VALUE,
			...prev,
			selectiveFilters: {},
		}));
	}, [setFilterValue]);

	const setTextFilters: SetLocalStorageStateFunction<
		TicketsFilterValue["textFilters"]
	> = useCallback(
		(newValue) => {
			setFilterValue((prev) => ({
				...DEFAULT_FILTER_VALUE,
				...prev,
				textFilters:
					typeof newValue === "function"
						? newValue(prev?.textFilters)
						: newValue,
			}));
		},
		[setFilterValue],
	);

	const resetTextFilters = useCallback(() => {
		setFilterValue((prev) => ({
			...DEFAULT_FILTER_VALUE,
			...prev,
			textFilters: {
				text: "",
			},
		}));
	}, [setFilterValue]);

	return (
		<TicketFilterContext.Provider
			value={{
				filterValue,
				setSelectiveFilters,
				resetSelectiveFilters,
				setTextFilters,
				resetTextFilters,
			}}
		>
			{children}
		</TicketFilterContext.Provider>
	);
}
