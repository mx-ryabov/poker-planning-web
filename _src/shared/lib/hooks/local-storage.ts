import { useMemo } from "react";

export function useLocalStorage() {
	const storage = useMemo(() => {
		if (typeof localStorage !== "undefined") {
			return localStorage;
		}
		return null;
	}, []);

	return {
		setItem: (key: string, value: string) => {
			storage?.setItem(key, value);
		},
		getItem: (key: string) => {
			return storage?.getItem(key);
		},
		removeItem: (key: string) => {
			storage?.removeItem(key);
		},
	};
}
