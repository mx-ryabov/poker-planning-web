import { ListWrapper } from "./components/list";
import { ListItem } from "./components/list-item";
import { ListSection } from "./components/list-section";
import { ListSeparator } from "./components/list-separator";

export const List = Object.assign(ListWrapper, {
	Section: ListSection,
	Item: ListItem,
	Separator: ListSeparator,
});
