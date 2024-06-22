import { cva } from "class-variance-authority";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
	AriaPopoverProps,
	Overlay,
	useOverlayTrigger,
	usePopover,
} from "react-aria";
import {
	Button,
	ComboBox,
	DialogTrigger,
	Input,
	Label,
	ListBox,
	ListBoxItem,
	ListBoxItemProps,
	ListBoxProps,
	Popover,
} from "react-aria-components";
import {
	OverlayTriggerProps,
	OverlayTriggerState,
	useOverlayTriggerState,
} from "react-stately";
import { ArrowDownIcon } from "../../icon";

type Props<TItem> = {
	label?: string;
	children: React.ReactNode;
} & ListBoxProps<TItem>;

const input = cva(
	[
		"peer h-10 w-full border-2 text-sm rounded-lg box-border transition-colors outline-none px-3",
	],
	{
		variants: {
			hasError: {
				true: ["border-error-500"],
				false: [
					"border-neutral-100",
					"group-hover:border-primary-400",
					"focus:border-2 focus:border-primary-400",
					"focus-visible:border-primary-400 focus-visible:border-2",
				],
			},
		},
	},
);

type AutocompleteAriaTriggerProps<TItem> = {
	label?: string;
} & ListBoxProps<TItem> &
	OverlayTriggerProps;

const AutocompleteAria = (props: AutocompleteAriaTriggerProps<any>) => {
	const { label, children, ...restProps } = props;
	const triggerRef = useRef<HTMLDivElement>(null);
	const popoverRef = useRef<HTMLElement>(null);

	const state = useOverlayTriggerState(restProps);
	const { triggerProps, overlayProps } = useOverlayTrigger(
		{ type: "listbox" },
		state,
		triggerRef,
	);

	return (
		<>
			<div ref={triggerRef}>
				<Label>{label}</Label>
				<div className="relative flex items-center">
					<Input
						className={input({ hasError: false })}
						onFocus={() => state.open()}
					/>
					<Button
						className="absolute right-2 text-neutral-200"
						{...triggerProps}
					>
						<ArrowDownIcon size={16} />
					</Button>
				</div>
			</div>
			<Popover
				triggerRef={triggerRef}
				ref={popoverRef}
				{...restProps}
				{...state}
				style={() => ({
					width: `${triggerRef.current?.getBoundingClientRect().width}px`,
				})}
				onOpenChange={state.setOpen}
				placement="bottom start"
				className="data-[entering]:animate-popup data-[exiting]:animate-popup-reverse"
			>
				<ListBox
					selectionMode="multiple"
					{...overlayProps}
					className={`py-2 w-full bg-white rounded-lg border border-neutral-100 drop-shadow`}
				>
					{children}
				</ListBox>
			</Popover>
		</>
	);
};

const AutocompleteAriaItem = (props: ListBoxItemProps) => {
	return (
		<ListBoxItem
			className="flex flex-row pl-3 pr-5 py-2 items-center cursor-pointer transition-colors gap-2
                        text-neutral-500 text-sm font-normal
                        hover:bg-neutral-100
                        active:bg-neutral-200
                        aria-disabled:text-neutral-200 aria-disabled:hover:bg-white aria-disabled:cursor-default
                         data-[selected]:bg-primary-200
                          data-[focus-visible]:bg-neutral-100"
			{...props}
		>
			{props.children}
		</ListBoxItem>
	);
};

const _AutocompleteAria = Object.assign(AutocompleteAria, {
	Item: AutocompleteAriaItem,
});

export { _AutocompleteAria as AutocompleteAria };
