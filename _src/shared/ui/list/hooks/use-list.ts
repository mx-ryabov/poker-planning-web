import { useListState } from "../providers/list-provider";

export function useList() {
	const { selectionMode } = useListState();

	return { selectionMode };
}
