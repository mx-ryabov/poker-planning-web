import { useRef, useMemo, useContext, useCallback } from "react";
import { KeyboardEvent } from "@react-types/shared";
import { useSelectableCollection } from "@react-aria/selection";
import { ListKeyboardDelegate } from "react-aria";
import { InputProps } from "../../input";
import { AutocompleteValueContext } from "../contexts/autocomplete-value-context";
import {
	ListStateContext,
	OverlayTriggerStateContext,
} from "react-aria-components";

export function useAutocompleteValue() {
	const {
		label,
		errorMessages,
		placeholder,
		isDisabled,
		isInvalid,
		selectionMode,
		searchValue,
		listRef,
		setSearchValue,
		toggle,
		open,
	} = useContext(AutocompleteValueContext);
	const listState = useContext(ListStateContext);
	const overlayTriggerState = useContext(OverlayTriggerStateContext);

	const inputRef = useRef<HTMLInputElement>(null!);

	const delegate = useMemo(
		() =>
			new ListKeyboardDelegate(
				listState.collection,
				listState.disabledKeys,
				listRef,
			),
		[listState.collection, listState.disabledKeys, listRef],
	);

	const { collectionProps } = useSelectableCollection({
		selectionManager: listState.selectionManager,
		keyboardDelegate: delegate,
		disallowTypeAhead: true,
		disallowEmptySelection: true,
		ref: inputRef,
		isVirtualized: true,
	});

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const { isFocused, focusedKey } = listState.selectionManager;

			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (!overlayTriggerState.isOpen) {
					open("full");
					return;
				} else {
					if (!isFocused) {
						listState.selectionManager.setFocused(true);
					}
				}
			}
			if (e.key === "Enter") {
				if (overlayTriggerState.isOpen) {
					e.preventDefault();
					listState.selectionManager.select(focusedKey);
				}
			}
			if (e.key === "Escape") {
				overlayTriggerState.close();
			}
			collectionProps.onKeyDown && collectionProps.onKeyDown(e);
		},
		[
			collectionProps.onKeyDown,
			overlayTriggerState.isOpen,
			overlayTriggerState.close,
			open,
			listState.selectionManager,
			selectionMode,
		],
	);

	const onChange = useCallback(
		(textValue: string) => {
			open("filtered");
			setSearchValue(textValue);

			// TODO: Move to the state hook
			const firstChildKey = Array.from(
				listState.collection.getKeys(),
			).find((key) => {
				const item = listState.collection.getItem(key);
				return item?.type === "item";
			});

			if (firstChildKey) {
				listState.selectionManager.setFocusedKey(firstChildKey);
			}
		},
		[open, setSearchValue, listState],
	);

	const onFocus = useCallback(() => {
		if (!overlayTriggerState.isOpen) {
			open("full");
		}
	}, [overlayTriggerState.isOpen, open]);

	const inputProps: InputProps = useMemo(
		() => ({
			ref: inputRef,
			role: "combobox",
			autoComplete: "off",
			"aria-labelledby": "autocomplete-input",
			label,
			placeholder,
			errors: errorMessages,
			value: searchValue,
			isDisabled,
			isInvalid,
			onFocus,
			onKeyDown,
			onChange,
		}),
		[
			inputRef,
			label,
			errorMessages,
			searchValue,
			onKeyDown,
			onChange,
			onFocus,
		],
	);

	const toggleBtnProps = useMemo(
		() => ({
			isDisabled,
			onPress: () => {
				inputRef.current.focus();
				toggle("full");
			},
		}),
		[toggle, inputRef],
	);

	return {
		inputProps,
		overlayTriggerState,
		toggleBtnProps,
	};
}
