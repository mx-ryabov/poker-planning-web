import { createContext, RefObject, SetStateAction } from "react";
import { SelectionMode } from "react-aria-components";
import { Node } from "react-stately";
import { RenderedCollectionType } from "../hooks/use-autocomplete-state";

export type AutocompleteValueContextProps<TItemData extends { id: string }> = {
	label: string;
	errorMessages?: string[];
	placeholder?: string;
	isDisabled?: boolean;
	isInvalid?: boolean;
	selectionMode: Exclude<SelectionMode, "none">;
	listRef: RefObject<HTMLDivElement>;
	selectedNodes: Node<TItemData>[];

	searchValue: string;
	setSearchValue: (value: SetStateAction<string>) => void;
	onSearchValueChange: (textValue: string) => void;

	toggle: (renderedCollectionType: RenderedCollectionType) => void;
	open: (renderedCollectionType: RenderedCollectionType) => void;
};

export const AutocompleteValueContext = createContext<
	AutocompleteValueContextProps<{ id: string }>
>(null!);
