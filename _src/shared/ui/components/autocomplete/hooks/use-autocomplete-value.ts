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
import { ListKeyboardDelegate, PressEvent, useFocusWithin } from "react-aria";
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
		selectionMode,
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
			collectionProps.onKeyDown && collectionProps.onKeyDown(e);
		},
		[
			collectionProps.onKeyDown,
			overlayTriggerState?.isOpen,
			overlayTriggerState?.close,
			open,
			listState.selectionManager,
			selectionMode,
			collectionProps.onKeyDown,
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
		[overlayTriggerState?.close, autocompleteValueContainerRef, listRef],
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
			onPress: (e: PressEvent) => {
				toggle("full");
			},
		}),
		[toggle, inputRef, overlayTriggerState?.isOpen, isDisabled],
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
	};
}
