import { useValueChanged } from "@/_src/shared/lib";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

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

	const valueBeforeChangeRef = useRef<string | undefined>(value);
	const [editorValue, setEditorValue] = useState(value);

	const prevValue = useValueChanged(value);
	if (prevValue.isChanged) {
		setEditorValue(value);
		valueBeforeChangeRef.current = value;
	}

	const confirmChanges = useCallback(() => {
		if (valueBeforeChangeRef.current !== editorValue) {
			valueBeforeChangeRef.current = editorValue;
			onConfirm(editorValue);
		}
	}, [onConfirm, editorValue]);

	const cancelChanges = useCallback(() => {
		setEditorValue(valueBeforeChangeRef.current || "");
		if (onCancel) {
			onCancel();
		}
	}, [onCancel, valueBeforeChangeRef]);

	return {
		editorValue,
		setEditorValue,
		confirmChanges,
		cancelChanges,
	};
}
