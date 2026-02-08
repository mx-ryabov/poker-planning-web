import {
	useRef,
	useMemo,
	useContext,
	useCallback,
	FocusEvent,
	useEffect,
} from "react";
import { KeyboardEvent } from "@react-types/shared";
import { useSelectableCollection } from "@react-aria/selection";
import { Key, ListKeyboardDelegate } from "react-aria";
import { InputProps } from "../../input";
import { AutocompleteValueContext } from "../contexts/autocomplete-value-context";
import { OverlayTriggerStateContext } from "react-aria-components";

export function useAutocompleteValue() {
	const {
		listState,
		label,
		errorMessages,
		placeholder,
		isDisabled,
		isInvalid,
		searchValue,
		listRef,
		selectedNodes,
		onSearchValueChange,
		toggle,
		open,
	} = useContext(AutocompleteValueContext);
	const overlayTriggerState = useContext(OverlayTriggerStateContext);

	const inputRef = useRef<HTMLInputElement>(null!);
	const autocompleteValueContainerRef = useRef<HTMLDivElement>(null!);

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

	useEffect(() => {
		const inputEl = inputRef.current;
		if (!inputEl || !overlayTriggerState?.isOpen) return;

		inputEl.focus();
	}, [overlayTriggerState?.isOpen, inputRef]);

	const focusListItem = useCallback(
		(key: "ArrowDown" | "ArrowUp") => {
			const isAllKeysDisabled =
				listState.disabledKeys.size === listState.collection.size;
			if (isAllKeysDisabled || listState.collection.size === 0) return;

			const focusedKey = listState.selectionManager.focusedKey;
			if (focusedKey === null) {
				listState.selectionManager.setFocusedKey(
					listState.collection.getFirstKey(),
				);
				return;
			}

			let nextFocusedKey: Key | null = null;

			if (key === "ArrowDown") {
				nextFocusedKey = listState.collection.getKeyAfter(focusedKey);
				nextFocusedKey =
					nextFocusedKey ?? listState.collection.getFirstKey();
			}
			if (key === "ArrowUp") {
				nextFocusedKey = listState.collection.getKeyBefore(focusedKey);
				nextFocusedKey =
					nextFocusedKey ?? listState.collection.getLastKey();
			}

			let isKeyDisabled = listState.disabledKeys.has(nextFocusedKey!);
			while (isKeyDisabled) {
				if (key === "ArrowDown") {
					nextFocusedKey = listState.collection.getKeyAfter(
						nextFocusedKey!,
					);
				}
				if (key === "ArrowUp") {
					nextFocusedKey = listState.collection.getKeyBefore(
						nextFocusedKey!,
					);
				}
				isKeyDisabled = listState.disabledKeys.has(nextFocusedKey!);
			}

			listState.selectionManager.setFocusedKey(nextFocusedKey);
		},
		[listState],
	);

	const onContainerKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const { isFocused } = listState.selectionManager;
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				e.stopPropagation();
				if (!overlayTriggerState?.isOpen) {
					open("full");
					return;
				} else {
					if (!isFocused) {
						listState.selectionManager.setFocused(true);
					} else {
						focusListItem(e.key);
					}
				}
			}
		},
		[listState.selectionManager, overlayTriggerState, open, focusListItem],
	);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const { isFocused, focusedKey } = listState.selectionManager;

			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (!overlayTriggerState?.isOpen) {
					open("full");
					return;
				} else {
					if (!isFocused) {
						listState.selectionManager.setFocused(true);
					}
				}
			}
			if (e.key === "Enter" && focusedKey) {
				if (overlayTriggerState?.isOpen) {
					e.preventDefault();
					listState.selectionManager.select(focusedKey);
				}
			}
			if (e.key === "Escape") {
				overlayTriggerState?.close();
			}
			collectionProps.onKeyDown?.(e);
		},
		[
			collectionProps,
			overlayTriggerState,
			open,
			listState.selectionManager,
		],
	);

	const onChange = useCallback(
		(textValue: string) => {
			onSearchValueChange(textValue);
		},
		[onSearchValueChange],
	);

	const onFocus = useCallback(() => {
		if (!overlayTriggerState?.isOpen) {
			open("full");
		}
	}, [overlayTriggerState?.isOpen, open]);

	const onBlur = useCallback(
		(e: FocusEvent<HTMLInputElement, Element>) => {
			const containerEl = autocompleteValueContainerRef.current;
			const listEl = listRef.current;
			if (!containerEl || !listEl) return;

			if (
				!containerEl.contains(e.relatedTarget) &&
				!listEl.contains(e.relatedTarget)
			) {
				overlayTriggerState?.close();
			}
		},
		[overlayTriggerState, autocompleteValueContainerRef, listRef],
	);

	const inputProps: InputProps = useMemo(
		() => ({
			role: "combobox",
			autoComplete: "off",
			"aria-label": "autocomplete-input",
			label,
			placeholder,
			errors: errorMessages,
			value: searchValue,
			isDisabled,
			isInvalid,
			onFocus,
			onKeyDown,
			onChange,
			onBlur,
		}),
		[
			label,
			errorMessages,
			searchValue,
			onKeyDown,
			onChange,
			onFocus,
			isDisabled,
			isInvalid,
			placeholder,
			onBlur,
		],
	);

	const toggleBtnProps = useMemo(
		() => ({
			isDisabled,
			onPress: () => {
				toggle("full");
			},
		}),
		[toggle, isDisabled],
	);

	const containerProps = useMemo(
		() => ({ onKeyDown: onContainerKeyDown }),
		[onContainerKeyDown],
	);

	return {
		isDisabled,
		listState,
		inputProps,
		inputRef,
		autocompleteValueContainerRef,
		overlayTriggerState,
		toggleBtnProps,
		selectedNodes,
		containerProps,
	};
}
