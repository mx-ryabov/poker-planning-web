import { ReactElement, ReactNode } from "react";

export type RenderFnType<TItem, TProps> = (item: TItem) => ReactElement<TProps>;
export type RenderPropsType<TItem, TProps> =
	| ReactNode
	| RenderFnType<TItem, TProps>;
