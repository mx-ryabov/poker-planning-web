import { ReactNode, useId, useMemo } from "react";
import { useOverlayTriggerState } from "react-stately";
import { ButtonSquare } from "../button";
import { CheckIcon, CloseIcon } from "../icon";
import { PopoverWithoutFocusManagment } from "./components/popover-without-focus-management";
import { Button, Label } from "react-aria-components";
import { useInlineEditState } from "./state/use-inline-edit-state";
import { useInlineEdit } from "./behavior/use-inline-edit";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

export type EditRenderProps = {
	onChange: (value: string) => void;
	confirm: () => void;
	value: string;
};

export type ReadRenderProps = {
	value: string;
};

export type InlineEditProps = {
	label?: string;
	value: string;
	keepEditViewOpenOnBlur?: boolean;
	isInvalid?: boolean;
	isDisabled?: boolean;
	id?: string;
	containerClassName?: string;
	onConfirm: (value: string) => void;
	onCancel?: () => void;
	editView: (renderProps: EditRenderProps) => ReactNode;
	readView: (renderProps: ReadRenderProps) => ReactNode;
};

export const InlineEdit = (props: InlineEditProps) => {
	const {
		label,
		value,
		keepEditViewOpenOnBlur = false,
		isInvalid,
		isDisabled,
		id: externalId,
		containerClassName,
		onConfirm,
		onCancel,
		editView,
		readView,
	} = props;

	const internalId = useId();
	const id = externalId || internalId;

	const state = useInlineEditState({ value, onConfirm, onCancel });
	const overlayTriggerState = useOverlayTriggerState({});

	const {
		focusWithinProps,
		viewContainerRef,
		confirmBtnProps,
		cancelBtnProps,
		popoverProps,
	} = useInlineEdit({
		overlayTriggerState,
		state,
		keepEditViewOpenOnBlur,
		isInvalid,
		id,
	});

	const actionButtons = useMemo(() => {
		return (
			<div className="flex flex-row gap-1">
				<ButtonSquare
					variant={keepEditViewOpenOnBlur ? "outline" : "grayed-out"}
					className={actionBtnStyles({
						withShadow: !keepEditViewOpenOnBlur,
					})}
					icon={CheckIcon}
					data-testid={`${id}-confirm-button`}
					{...confirmBtnProps}
				/>
				<ButtonSquare
					variant={keepEditViewOpenOnBlur ? "outline" : "grayed-out"}
					className={actionBtnStyles({
						withShadow: !keepEditViewOpenOnBlur,
					})}
					data-testid={`${id}-cancel-button`}
					icon={CloseIcon}
					{...cancelBtnProps}
				/>
			</div>
		);
	}, [confirmBtnProps, cancelBtnProps, id, keepEditViewOpenOnBlur]);

	return (
		<div
			{...focusWithinProps}
			className={twMerge("w-full", containerClassName)}
		>
			<div ref={viewContainerRef} className="flex flex-col gap-1">
				{label && (
					<Label className="text-sm font-semibold text-neutral-500">
						{label}
					</Label>
				)}
				{!overlayTriggerState.isOpen && (
					<Button
						onPress={overlayTriggerState.open}
						className="outline-primary-500 rounded-lg text-left"
						isDisabled={isDisabled}
						data-testid={`${id}-read-view`}
					>
						{readView({ value: state.editorValue })}
					</Button>
				)}
				{overlayTriggerState.isOpen &&
					!isDisabled &&
					editView({
						value: state.editorValue,
						onChange: state.setEditorValue,
						confirm: () => {
							if (!isInvalid) {
								state.confirmChanges();
								overlayTriggerState.close();
							}
						},
					})}
			</div>

			{keepEditViewOpenOnBlur &&
				overlayTriggerState.isOpen &&
				!isDisabled && (
					<div className="mt-2 flex w-full justify-end">
						{actionButtons}
					</div>
				)}

			{!keepEditViewOpenOnBlur && !isDisabled && (
				<PopoverWithoutFocusManagment
					aria-label={`${label} confirmation popup`}
					className="data-entering:animate-popup data-exiting:animate-popup-reverse"
					{...popoverProps}
				>
					{actionButtons}
				</PopoverWithoutFocusManagment>
			)}
		</div>
	);
};

const actionBtnStyles = cva("h-8 w-8 border-neutral-100", {
	variants: {
		withShadow: {
			true: "",
			false: "drop-shadow-none",
		},
	},
});
