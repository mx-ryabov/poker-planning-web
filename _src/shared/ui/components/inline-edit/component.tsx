import { ReactNode } from "react";
import { useOverlayTriggerState } from "react-stately";
import { ButtonSquare } from "../button";
import { CheckIcon, CloseIcon } from "../icon";
import { PopoverWithoutFocusManagment } from "./components/popover-without-focus-management";
import { Button, Label } from "react-aria-components";
import { useInlineEditState } from "./state/use-inline-edit-state";
import { useInlineEdit } from "./behavior/use-inline-edit";

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
		onConfirm,
		onCancel,
		editView,
		readView,
	} = props;

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
	});

	const renderActionButtons = () => {
		return (
			<div className="flex flex-row gap-1">
				<ButtonSquare
					variant="grayed-out"
					className="w-8 h-8"
					icon={CheckIcon}
					{...confirmBtnProps}
				/>
				<ButtonSquare
					variant="grayed-out"
					className="w-8 h-8"
					icon={CloseIcon}
					{...cancelBtnProps}
				/>
			</div>
		);
	};

	return (
		<div {...focusWithinProps} className="w-full">
			<div ref={viewContainerRef} className="flex flex-col">
				<Label className="text-neutral-900">{label}</Label>
				{!overlayTriggerState.isOpen && (
					<Button
						onPress={overlayTriggerState.open}
						className="text-left outline-primary-500 rounded-lg"
					>
						{readView({ value: state.editorValue })}
					</Button>
				)}
				{overlayTriggerState.isOpen &&
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

			{keepEditViewOpenOnBlur && overlayTriggerState.isOpen && (
				<div className="flex justify-end w-full mt-2">
					{renderActionButtons()}
				</div>
			)}

			{!keepEditViewOpenOnBlur && (
				<PopoverWithoutFocusManagment
					aria-label={`${label} confirmation popup`}
					className="data-entering:animate-popup data-exiting:animate-popup-reverse"
					{...popoverProps}
				>
					{renderActionButtons()}
				</PopoverWithoutFocusManagment>
			)}
		</div>
	);
};
