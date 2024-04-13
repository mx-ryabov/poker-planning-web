import { useContext } from "react";
import { CreateGamePageContext } from "./provider";

export function useCreatePageData() {
	return useContext(CreateGamePageContext);
}
