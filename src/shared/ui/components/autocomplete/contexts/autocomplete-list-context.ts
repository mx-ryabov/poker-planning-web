import { createContext } from "react";
import { ListState } from "react-stately";

interface AutocompleteListContextValue {
	state: ListState<unknown>;
	shouldFocusOnHover: boolean;
	shouldUseVirtualFocus: boolean;
}

export const AutocompleteListContext =
	createContext<AutocompleteListContextValue>(null!);
