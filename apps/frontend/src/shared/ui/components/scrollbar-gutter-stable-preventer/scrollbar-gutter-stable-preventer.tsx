"use client";
import { usePreventScrollbarGutterStable } from "../../../lib/hooks";

export function ScrollbarGutterStablePreventer() {
	usePreventScrollbarGutterStable();
	return null;
}
