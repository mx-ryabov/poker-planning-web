import { ListWrapper } from "./components/list";
import { ListItem } from "./components/list-item";
import { ListSection } from "./components/list-section";

export const List = Object.assign(ListWrapper, {
	Section: ListSection,
	Item: ListItem,
});
