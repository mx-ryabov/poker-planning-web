import SelectItem from "./components/select-item";
import SelectSection from "./components/select-section";
import SelectWrapper from "./components/select-wrapper";

export const Select = Object.assign(SelectWrapper, {
	Item: SelectItem,
	Section: SelectSection,
});
