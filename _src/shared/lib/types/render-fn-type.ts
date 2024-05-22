export type RenderFnType<TItem, TProps> = (
	item: TItem,
) => React.ReactElement<TProps>;
