import { RefObject, useCallback } from "react";

export function useScrollToListBottom(
	listRef: RefObject<HTMLDivElement | null>,
) {
	return useCallback(() => {
		const listEl = listRef.current;
		if (listEl) {
			listEl.scrollTo({
				top: listEl.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [listRef]);
}
