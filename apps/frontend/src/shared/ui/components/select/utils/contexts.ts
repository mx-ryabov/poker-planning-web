import {
	DOMAttributes,
	LabelHTMLAttributes,
	RefObject,
	createContext,
} from "react";
import { Key, OverlayTriggerState } from "react-stately";
import { SelectionMode } from "react-aria-components";
import { AriaLabelingProps, DOMProps } from "@react-types/shared";

export type SelectValueContextProps = {
	label?: string;
	labelProps:
		| DOMAttributes<HTMLLabelElement>
		| LabelHTMLAttributes<HTMLLabelElement>;
	fieldProps: AriaLabelingProps & DOMProps;
	overlayTriggerState: OverlayTriggerState;
	triggerRef: RefObject<HTMLDivElement | null>;
	placeholder?: string;
	isDisabled?: boolean;
	isInvalid?: boolean;
	selectionMode: Exclude<SelectionMode, "none">;
	disabledKeys?: Key[];
	selectedItems: { textValue: string; key: Key }[];
	id?: string;
	onSelectionRemove: (keys: Set<Key>) => void;
};

export const SelectValueContext = createContext<SelectValueContextProps>(null!);
