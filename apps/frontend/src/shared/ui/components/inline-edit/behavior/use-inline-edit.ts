import { useCallback, useRef } from "react";
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
	id: string;
};

export function useInlineEdit<THTMLElement extends EditorElement>(
	props: Props,
) {
	const {
		overlayTriggerState,
		state,
		keepEditViewOpenOnBlur,
		isInvalid,
		id,
	} = props;
	const { confirmChanges, cancelChanges } = state;

	const editorRef = useRef<THTMLElement | null>(null);
	const viewContainerRef = useRef<HTMLDivElement | null>(null);

	/**
	 * Focus Management
	 */
	const onFocusWithin = useCallback(() => {
		overlayTriggerState.open();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [overlayTriggerState.open]);

	const onBlurWithin = useCallback(
		() => {
			if (keepEditViewOpenOnBlur || !overlayTriggerState.isOpen) return;

			if (!isInvalid) {
				confirmChanges();
			} else {
				cancelChanges();
			}
			overlayTriggerState.close();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			overlayTriggerState.isOpen,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [overlayTriggerState.close, confirmChanges, isInvalid]);

	const onCancelChanges = useCallback(() => {
		cancelChanges();
		overlayTriggerState.close();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		id,
		shouldCloseOnInteractOutside: () => false,
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
