import { cva } from "class-variance-authority";
import { CloseIcon } from "../icon";
import {
	Button as AriaButton,
	Tag,
	TagGroup,
	TagGroupProps,
	TagList,
	TagListProps,
	TagProps,
} from "react-aria-components";
import { buildProvider } from "@/_src/shared/lib";

type ChipProps = TagProps & Required<Pick<TagProps, "textValue">>;

const chip = cva(
	[
		"h-[21px] bg-neutral-100 rounded flex flex-row min-w-fit pl-2 pr-1 text-neutral-500 text-xs items-center transition-all select-none",
	],
	{
		variants: {
			outlined: {
				true: ["border"],
				false: [],
			},
			disabled: {
				true: ["text-neutral-300"],
				false: ["cursor-pointer"],
			},
		},
		compoundVariants: [
			{
				outlined: true,
				disabled: true,
				className: "border-neutral-300",
			},
			{
				outlined: true,
				disabled: false,
				className: "border-neutral-500",
			},
		],
	},
);

export function Chip(props: ChipProps) {
	const { children, ...restProps } = props;
	const { outlined } = useChipGroupContext();

	return (
		<Tag
			{...restProps}
			className={chip({ outlined, disabled: restProps.isDisabled })}
		>
			{({ allowsRemoving }) => (
				<>
					<span className="mr-1">{props.textValue}</span>
					{allowsRemoving && !restProps.isDisabled && (
						<AriaButton
							slot="remove"
							className="rounded hover:bg-neutral-200 active:hover:bg-neutral-300 transition-colors"
						>
							<CloseIcon size={16} />
						</AriaButton>
					)}
				</>
			)}
		</Tag>
	);
}

type ChipGroupProps<T> = { outlined?: boolean } & Omit<
	TagGroupProps,
	"children"
> &
	Pick<TagListProps<T>, "items" | "children" | "renderEmptyState">;

export function ChipGroup<TItem extends object>({
	items,
	children,
	outlined,
	renderEmptyState,
	...props
}: ChipGroupProps<TItem>) {
	return (
		<ChipGroupContextProvider value={{ outlined }}>
			<TagGroup {...props}>
				<TagList
					items={items}
					renderEmptyState={renderEmptyState}
					className="flex flex-row gap-2 flex-wrap"
				>
					{children}
				</TagList>
			</TagGroup>
		</ChipGroupContextProvider>
	);
}

type ChipGroupContext = {
	outlined?: boolean;
};

const [useChipGroupContext, ChipGroupContextProvider] =
	buildProvider<ChipGroupContext>();
