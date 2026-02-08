import { usePrevValueState } from "@/src/shared/lib";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type Props = {
	value: string;
	onConfirm: (value: string) => void;
	onCancel?: () => void;
};

export type InlineEditState = {
	editorValue: string;
	setEditorValue: Dispatch<SetStateAction<string>>;
	confirmChanges: () => void;
	cancelChanges: () => void;
};

export function useInlineEditState(props: Props): InlineEditState {
	const { value, onConfirm, onCancel } = props;

	const [editorValue, setEditorValue] = useState(value);

	const prevValueState = usePrevValueState(value);
	if (prevValueState.isChanged) {
		setEditorValue(value);
	}

	const confirmChanges = useCallback(() => {
		if (value !== editorValue) {
			onConfirm(editorValue);
		}
	}, [onConfirm, editorValue, value]);

	const cancelChanges = useCallback(() => {
		setEditorValue(value);
		onCancel?.();
	}, [onCancel, value]);

	return {
		editorValue,
		setEditorValue,
		confirmChanges,
		cancelChanges,
	};
}
