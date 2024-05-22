import { useControlledState } from "@/_src/shared/lib";
import { useCallback } from "react";

export default function useListSelectionState(
	value?: React.Key[],
	defaultValue?: React.Key[],
	selectionMode?: "single" | "multiple",
	onChange?: (value: Set<React.Key>) => void,
) {
	const [selectedItems, setSelectedItems] = useControlledState<
		Set<React.Key>
	>(value ? new Set(value) : undefined, new Set(defaultValue), onChange);

	const setValue = useCallback(
		(value: React.Key) => {
			if (selectionMode === undefined) return;

			if (selectionMode === "multiple") {
				setSelectedItems((oldValue) => {
					const oldSet = new Set(oldValue);
					if (oldSet.delete(value)) {
						return oldSet;
					} else {
						return oldSet.add(value);
					}
				});
			} else {
				setSelectedItems(new Set([value]));
			}
		},
		[setSelectedItems, selectionMode],
	);

	return { selectedItems, setSelectedItems: setValue };
}
