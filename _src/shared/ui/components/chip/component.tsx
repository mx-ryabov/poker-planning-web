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
import { useRef } from "react";

type ChipProps = TagProps & Required<Pick<TagProps, "textValue">>;

const chip = cva(
	[
		"h-[21px] min-w-fit pl-2 pr-1",
		"flex flex-row items-center",
		"bg-neutral-100 text-neutral-500",
		"rounded-sm text-xs transition-all select-none outline-primary-500",
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
			className={({ isDisabled }) =>
				chip({ outlined, disabled: restProps.isDisabled || isDisabled })
			}
			aria-label={`${props.textValue} chip`}
		>
			{({ allowsRemoving, isDisabled }) => (
				<>
					<span className="mr-1">{props.textValue}</span>
					{allowsRemoving && !restProps.isDisabled && !isDisabled && (
						<AriaButton
							slot="remove"
							aria-label={`Remove ${props.textValue}`}
							className="rounded-sm hover:bg-neutral-200 active:hover:bg-neutral-300 transition-colors"
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
	className,
	renderEmptyState,
	...props
}: ChipGroupProps<TItem>) {
	const tagListRef = useRef<HTMLDivElement>(null);

	return (
		<ChipGroupContextProvider value={{ outlined }}>
			<TagGroup
				{...props}
				aria-label={props["aria-label"] || "Chip group"}
			>
				<TagList
					items={items}
					ref={tagListRef}
					renderEmptyState={renderEmptyState}
					className={"flex flex-row gap-2 flex-wrap " + className}
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

export const [useChipGroupContext, ChipGroupContextProvider] =
	buildProvider<ChipGroupContext>();
