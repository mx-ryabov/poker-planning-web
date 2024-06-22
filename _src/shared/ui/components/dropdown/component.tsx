/**
 * TODO:
 * 1. keyboard interaction???
 * 2. accessibility with focus and active states
 * 3. disabled state +
 * 4. items as a prop in menu? with Iterable type +
 * 5. onSelected in Menu not in MenuItem +
 * 6. Implement DropdownSection? +
 * 7. Autocomplete - make as a separate component
 * 8. Select - make as sa separate component
 */

import DropdownMenu from "./components/dropdown-menu";
import { DropdownMenuItem } from "./components/dropdown-menu-item";
import { DropdownMenuSection } from "./components/dropdown-menu-section";
import DropdownTrigger from "./components/dropdown-trigger";
import { DropdownWrapper } from "./components/dropdown-wrapper";

export const Dropdown = Object.assign(DropdownWrapper, {
	Trigger: DropdownTrigger,
	Menu: Object.assign(DropdownMenu, {
		Section: DropdownMenuSection,
		Item: DropdownMenuItem,
	}),
});
