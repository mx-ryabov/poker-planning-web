import { AutocompleteItem } from "./components/autocomplete-item";
import { AutocompleteSection } from "./components/autocomplete-section";
import { AutocompleteWrapper } from "./components/autocomplete-wrapper";

export const Autocomplete = Object.assign(AutocompleteWrapper, {
	Item: AutocompleteItem,
	Section: AutocompleteSection,
});
