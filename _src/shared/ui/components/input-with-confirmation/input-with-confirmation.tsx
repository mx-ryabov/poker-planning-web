import {
	forwardRef,
	MutableRefObject,
	useCallback,
	useRef,
	useState,
	FocusEvent,
} from "react";
import { Input, InputProps } from "../input/component";
import { useOverlayTriggerState } from "react-stately";
import { ButtonSquare } from "../button";
import { CheckIcon, CloseIcon } from "../icon";
import { setRefs } from "@/_src/shared/lib";
import { PressEvent, useFocusWithin } from "react-aria";
import { PopoverWithoutFocusManagment } from "./input-with-confirmation-popover";

type Props = InputProps;

export const InputWithConfirmation = forwardRef<HTMLInputElement, Props>(
	(props, ref) => {
		const { onChange, value, ...restProps } = props;

		const [inputValue, setInputValue] = useState(value);
		const inputRef = useRef<HTMLInputElement>(null);
		const containerRef = useRef<HTMLDivElement>(null);
		const valueBeforeChangeRef = useRef<string | undefined>(value);
		const inputContainerRef: MutableRefObject<HTMLDivElement | null> =
			useRef(null);
		const overlayTriggerState = useOverlayTriggerState({});

		const commitChanges = useCallback(() => {
			if (
				onChange &&
				inputValue &&
				valueBeforeChangeRef.current !== inputValue
			) {
				valueBeforeChangeRef.current = inputValue;
				onChange(inputValue);
			}
		}, [onChange, inputValue, valueBeforeChangeRef]);

		const cancelChanges = useCallback(() => {
			setInputValue(valueBeforeChangeRef.current);
		}, [setInputValue, valueBeforeChangeRef]);

		const onCommitChanges = useCallback(
			(e: PressEvent) => {
				commitChanges();
				(e.target as HTMLButtonElement).blur();
				overlayTriggerState.close();
			},
			[overlayTriggerState.close, commitChanges],
		);

		const onCancelChanges = useCallback(
			(e: PressEvent) => {
				cancelChanges();
				(e.target as HTMLButtonElement).blur();
				overlayTriggerState.close();
			},
			[overlayTriggerState.close, cancelChanges],
		);

		const onFocusWithin = useCallback(() => {
			valueBeforeChangeRef.current = inputRef.current?.value;
			overlayTriggerState.open();
		}, [overlayTriggerState.open, valueBeforeChangeRef, inputRef]);

		const onBlurWithin = useCallback(
			(e: FocusEvent) => {
				const blurElementActionType =
					e.target.attributes.getNamedItem("data-action")?.value;

				if (blurElementActionType !== "cancel") {
					commitChanges();
				}
				overlayTriggerState.close();
			},
			[overlayTriggerState.close, commitChanges],
		);

		const { focusWithinProps } = useFocusWithin({
			onFocusWithin,
			onBlurWithin,
		});

		return (
			<div {...focusWithinProps} className="w-full" ref={containerRef}>
				<div ref={inputContainerRef}>
					<Input
						{...restProps}
						value={inputValue}
						onChange={setInputValue}
						ref={setRefs(inputRef, ref)}
					/>
				</div>

				<PopoverWithoutFocusManagment
					aria-label="confirmation-popup"
					triggerRef={inputContainerRef}
					placement="bottom right"
					className="flex flex-row gap-1 data-[entering]:animate-popup data-[exiting]:animate-popup-reverse"
					isNonModal={true}
					state={overlayTriggerState}
				>
					<ButtonSquare
						variant="grayed-out"
						data-action="cancel"
						icon={CloseIcon}
						onPress={onCancelChanges}
					/>
					<ButtonSquare
						variant="grayed-out"
						data-action="commit"
						icon={CheckIcon}
						onPress={onCommitChanges}
					/>
				</PopoverWithoutFocusManagment>
			</div>
		);
	},
);
