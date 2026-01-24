import { useLocalStorageState } from "@/src/shared/lib";
import { createContext, useCallback, useContext } from "react";
import { z } from "zod";

const BarTogglersStateSchema = z.object({
	sorting: z.boolean(),
	filter: z.boolean(),
	search: z.boolean(),
});

type BarTogglersState = z.infer<typeof BarTogglersStateSchema>;
type TicketsControlBarTogglersContextValue = {
	barTogglersState: BarTogglersState;
	setShowSorting: (show: boolean) => void;
	setShowFilter: (show: boolean) => void;
	setShowSearch: (show: boolean) => void;
};

export const TicketsControlBarTogglersContext =
	createContext<TicketsControlBarTogglersContextValue>(null!);

const DEFAULT_BAR_TOGGLERS_STATE: BarTogglersState = {
	sorting: false,
	filter: false,
	search: false,
};
export function TicketsControlBarTogglersProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [barTogglersState, setBarTogglersState] =
		useLocalStorageState<BarTogglersState>(
			"tickets-control-bar-togglers-show-state",
			{
				defaultValue: DEFAULT_BAR_TOGGLERS_STATE,
				syncWithStorage: false,
				schema: BarTogglersStateSchema,
			},
		);

	const setShowSorting = useCallback(
		(show: boolean) => {
			setBarTogglersState((prev) => ({
				...DEFAULT_BAR_TOGGLERS_STATE,
				...prev,
				sorting: show,
			}));
		},
		[setBarTogglersState],
	);

	const setShowFilter = useCallback(
		(show: boolean) => {
			setBarTogglersState((prev) => ({
				...DEFAULT_BAR_TOGGLERS_STATE,
				...prev,
				filter: show,
			}));
		},
		[setBarTogglersState],
	);

	const setShowSearch = useCallback(
		(show: boolean) => {
			setBarTogglersState((prev) => ({
				...DEFAULT_BAR_TOGGLERS_STATE,
				...prev,
				search: show,
			}));
		},
		[setBarTogglersState],
	);

	return (
		<TicketsControlBarTogglersContext.Provider
			value={{
				barTogglersState,
				setShowSorting,
				setShowFilter,
				setShowSearch,
			}}
		>
			{children}
		</TicketsControlBarTogglersContext.Provider>
	);
}

export function useTicketsControlBarTogglers() {
	const context = useContext(TicketsControlBarTogglersContext);
	if (context === undefined) {
		throw new Error(
			"useTicketsControlBarTogglers must be within TicketsControlBarTogglersProvider",
		);
	}
	return context;
}
