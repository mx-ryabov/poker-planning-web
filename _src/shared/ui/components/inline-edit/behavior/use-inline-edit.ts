import { useCallback, useRef, FocusEvent } from "react";
import { useFocusWithin } from "react-aria";
import { OverlayTriggerState } from "react-stately";
import { InlineEditState } from "../state/use-inline-edit-state";
import { PopoverWithoutFocusManagmentProps } from "../components/popover-without-focus-management";

export type EditorElement = {
	focus: () => void;
};

type Props = {
	overlayTriggerState: OverlayTriggerState;
	state: InlineEditState;
	keepEditViewOpenOnBlur?: boolean;
	isInvalid?: boolean;
};

export function useInlineEdit<THTMLElement extends EditorElement>(
	props: Props,
) {
	const { overlayTriggerState, state, keepEditViewOpenOnBlur, isInvalid } =
		props;
	const { confirmChanges, cancelChanges } = state;

	const editorRef = useRef<THTMLElement | null>(null);
	const viewContainerRef = useRef<HTMLDivElement | null>(null);

	/**
	 * Focus Management
	 */
	const onFocusWithin = useCallback(() => {
		overlayTriggerState.open();
	}, [overlayTriggerState.open]);

	const onBlurWithin = useCallback(
		(e: FocusEvent) => {
			if (keepEditViewOpenOnBlur) return;

			if (!isInvalid) {
				confirmChanges();
			} else {
				cancelChanges();
			}
			overlayTriggerState.close();
		},
		[
			overlayTriggerState.close,
			confirmChanges,
			keepEditViewOpenOnBlur,
			cancelChanges,
			isInvalid,
		],
	);

	const { focusWithinProps } = useFocusWithin({
		onFocusWithin,
		onBlurWithin,
	});

	/** END **/

	/**
	 * Actions
	 */

	const onConfirmChanges = useCallback(() => {
		if (isInvalid) return;

		confirmChanges();
		overlayTriggerState.close();
	}, [overlayTriggerState.close, confirmChanges, isInvalid]);

	const onCancelChanges = useCallback(() => {
		cancelChanges();
		overlayTriggerState.close();
	}, [overlayTriggerState.close, cancelChanges]);

	/** END **/

	/**
	 * Inner components' props
	 */

	const cancelBtnProps = {
		onPress: onCancelChanges,
		"data-action": "cancel",
	};

	const confirmBtnProps = {
		onPress: onConfirmChanges,
		isDisabled: isInvalid,
		"data-action": "confirm",
	};

	const popoverProps: Omit<PopoverWithoutFocusManagmentProps, "children"> = {
		triggerRef: viewContainerRef,
		placement: "bottom right",
		isNonModal: true,
		state: overlayTriggerState,
		onDismiss: onConfirmChanges,
	};

	/** END **/

	return {
		editorRef,
		viewContainerRef,
		focusWithinProps,
		confirmBtnProps,
		cancelBtnProps,
		popoverProps,
	};
}
