import { createContext, RefObject, SetStateAction } from "react";
import { SelectionMode } from "react-aria-components";
import { RenderedCollectionType } from "../hooks/use-autocomplete-state";

export type AutocompleteValueContextProps = {
	label?: string;
	errorMessages?: string[];
	placeholder?: string;
	isDisabled?: boolean;
	isInvalid?: boolean;
	selectionMode: Exclude<SelectionMode, "none">;
	listRef: RefObject<HTMLDivElement>;

	searchValue: string;
	setSearchValue: (value: SetStateAction<string>) => void;

	toggle: (renderedCollectionType: RenderedCollectionType) => void;
	open: (renderedCollectionType: RenderedCollectionType) => void;
};

export const AutocompleteValueContext =
	createContext<AutocompleteValueContextProps>(null!);
