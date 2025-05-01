import { useCallback, useState } from "react";

export function useTicketCreatorOpenerState() {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const toggle = useCallback(() => {
		setIsOpened((prev) => !prev);
	}, []);

	return { isOpened, toggle };
}
