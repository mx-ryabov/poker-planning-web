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
import { buildProvider } from "@/src/shared/lib";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

type ChipProps = TagProps & Required<Pick<TagProps, "textValue">>;

const chip = cva(
	[
		"h-[21px] min-w-fit pl-2 pr-1",
		"flex flex-row items-center",
		"bg-neutral-200",
		"rounded-sm text-xs transition-colors select-none outline-primary-500",
	],
	{
		variants: {
			outlined: {
				true: ["border"],
				false: [],
			},
			disabled: {
				true: ["text-neutral-600 hover:cursor-not-allowed"],
				false: ["cursor-pointer text-neutral-900"],
			},
			isFocused: {
				true: ["outline-2"],
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
	const { outlined } = useChipGroupContext();

	return (
		<Tag
			{...props}
			className={({ isDisabled, isFocusVisible, isFocused }) =>
				chip({
					outlined,
					disabled: props.isDisabled || isDisabled,
					isFocused: isFocusVisible || isFocused,
				})
			}
			aria-label={`${props.textValue} chip`}
		>
			{({ allowsRemoving, isDisabled }) => (
				<>
					<span className="mr-1">{props.textValue}</span>
					{allowsRemoving && !props.isDisabled && !isDisabled && (
						<AriaButton
							slot="remove"
							aria-label={`Remove ${props.textValue}`}
							className="cursor-pointer rounded-sm transition-colors hover:bg-neutral-300 active:hover:bg-neutral-300"
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
					className={twMerge(
						"flex flex-row flex-wrap gap-2",
						className,
					)}
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
