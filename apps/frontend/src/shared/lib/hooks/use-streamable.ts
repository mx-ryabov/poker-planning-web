import { use } from "react";
import { Streamable } from "../types";

export function useStreamable<T>(streamable: Streamable<T>): T {
	return streamable instanceof Promise ? use(streamable) : streamable;
}
