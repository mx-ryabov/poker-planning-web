import {
	DOMAttributes,
	LabelHTMLAttributes,
	MutableRefObject,
	createContext,
} from "react";
import { Key, OverlayTriggerState } from "react-stately";
import { SelectionMode } from "react-aria-components";

export type SelectValueContextProps = {
	label?: string;
	labelProps: DOMAttributes<any> | LabelHTMLAttributes<HTMLLabelElement>;
	overlayTriggerState: OverlayTriggerState;
	triggerRef: MutableRefObject<HTMLDivElement | null>;
	placeholder?: string;
	isDisabled?: boolean;
	isInvalid?: boolean;
	selectionMode: Exclude<SelectionMode, "none">;
	disabledKeys?: Key[];
	selectedItems: { textValue: string; key: Key }[];
	onSelectionRemove: (keys: Set<Key>) => void;
};

export const SelectValueContext = createContext<SelectValueContextProps>(null!);
