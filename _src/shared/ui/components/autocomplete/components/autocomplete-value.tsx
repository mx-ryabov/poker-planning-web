import {
	KeyboardEvent,
	MutableRefObject,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { Input, InputProps } from "../../input";
import {
	ButtonContext,
	Group,
	Key,
	Provider,
	SelectionMode,
	Input as AriaInput,
	TextField,
	Tag,
	Label,
	FieldError,
} from "react-aria-components";
import { useAutocompleteValue } from "../hooks/use-autocomplete-value";
import { ButtonSquare } from "../../button";
import { ArrowDownIcon, WarningIcon } from "../../icon";
import { Chip, ChipGroup } from "../../chip";
import { cva } from "class-variance-authority";
import { FocusScope, mergeProps, useFocusManager } from "react-aria";

type Props = {
	selectionMode: SelectionMode;
};

export function AutocompleteValue({ selectionMode }: Props) {
	return selectionMode === "single" ? (
		<AutocompleteSingleValue />
	) : (
		<AutocompleteMultipleValue />
	);
}

function AutocompleteSingleValue() {
	const {
		inputProps,
		overlayTriggerState,
		toggleBtnProps,
		inputRef,
		autocompleteValueContainerRef,
	} = useAutocompleteValue();

	const toggleListButton = useMemo(() => {
		if (overlayTriggerState?.isOpen === null) return null;

		return (
			<Provider
				values={[
					[ButtonContext, { isPressed: overlayTriggerState?.isOpen }],
				]}
			>
				<ButtonSquare
					icon={ArrowDownIcon}
					size="small"
					variant="ghost"
					aria-label="autocomplete-toggle-button"
					excludeFromTabOrder={true}
					{...toggleBtnProps}
				/>
			</Provider>
		);
	}, [overlayTriggerState?.isOpen, toggleBtnProps]);

	return (
		<div className="w-full" ref={autocompleteValueContainerRef}>
			<Input
				{...inputProps}
				ref={inputRef}
				endContent={toggleListButton}
			/>
		</div>
	);
}

function AutocompleteMultipleValue() {
	const {
		inputProps,
		overlayTriggerState,
		toggleBtnProps,
		listState,
		isDisabled,
		selectedNodes,
		autocompleteValueContainerRef,
		inputRef,
	} = useAutocompleteValue();

	const toggleListButton = useMemo(() => {
		return (
			<Provider
				values={[
					[ButtonContext, { isPressed: overlayTriggerState?.isOpen }],
				]}
			>
				<ButtonSquare
					icon={ArrowDownIcon}
					size="small"
					data-testid="trigger"
					variant="ghost"
					aria-label="autocomplete-toggle-button"
					excludeFromTabOrder={true}
					{...toggleBtnProps}
				/>
			</Provider>
		);
	}, [overlayTriggerState?.isOpen, toggleBtnProps]);

	const selectedItems = useMemo(() => {
		const items = selectedNodes.map((node) => {
			return {
				id: node.key,
				textValue: node.textValue,
				type: "item",
			};
		});
		return items;
	}, [selectedNodes]);

	const onSelectionRemove = useCallback(
		(keys: Set<Key>) => {
			keys.forEach((key) => {
				listState.selectionManager.toggleSelection(key);
			});
		},
		[listState.selectionManager],
	);

	const removeLatestSelection = useCallback(() => {
		const lastKey: Key | undefined = selectedItems.at(-1)?.id;

		if (lastKey && !listState.selectionManager.isDisabled(lastKey)) {
			onSelectionRemove(new Set([lastKey]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		onSelectionRemove,
		listState.selectionManager.isDisabled,
		selectedItems,
	]);

	const chips = useMemo(() => {
		return (
			<FocusScope>
				<ChipGroup
					outlined={isDisabled}
					disabledKeys={isDisabled ? "all" : listState.disabledKeys}
					aria-label="Selected Items"
					className="flex min-h-10 items-center py-2 outline-hidden"
					items={undefined}
					onRemove={onSelectionRemove}
				>
					{selectedItems.map((item, ind) => (
						<Chip
							key={item.id}
							id={item.id}
							isDisabled={isDisabled}
							textValue={item.textValue}
							data-testid="selected-item-chip"
							data-focus-ind={ind}
						/>
					))}
					<TextFieldChip
						inputProps={inputProps}
						inputRef={inputRef}
						removeLatestSelection={removeLatestSelection}
					/>
				</ChipGroup>
			</FocusScope>
		);
	}, [
		isDisabled,
		listState.disabledKeys,
		onSelectionRemove,
		selectedItems,
		inputProps,
		inputRef,
		removeLatestSelection,
	]);

	const placeholder = useMemo(() => {
		if (selectedItems.length === 0 && !inputProps.value) {
			return (
				<span className="absolute left-4 text-sm text-neutral-800">
					{inputProps.placeholder}
				</span>
			);
		}
		return null;
	}, [selectedItems, inputProps.placeholder, inputProps.value]);

	return (
		<div
			className="group relative flex w-full flex-col"
			ref={autocompleteValueContainerRef}
			onClick={() => {
				const inputEl = inputRef?.current;
				if (inputEl && !overlayTriggerState?.isOpen) {
					inputEl.focus();
				}
			}}
		>
			<Label
				className={multipleValueLabelStyles({
					isDisabled: isDisabled,
				})}
				aria-label="Label"
				htmlFor="multiple-autocomplete-input"
			>
				{inputProps.label}
			</Label>
			<Group
				className={multipleValueStyles({
					hasError: !!inputProps.errors,
					isDisabled: isDisabled,
				})}
				data-testid="value-box"
			>
				{chips}
				{placeholder}
				{toggleListButton}
			</Group>
			<FieldError className="text-error-700 flex w-full flex-row items-center gap-1 p-1 text-xs font-medium">
				<WarningIcon size={12} thikness="bold" />
				{inputProps.errors?.length ? inputProps.errors[0] : null}
			</FieldError>
		</div>
	);
}

type TextFieldChipProps = {
	inputProps: InputProps;
	inputRef: RefObject<HTMLInputElement>;
	removeLatestSelection: () => void;
};

const TextFieldChip = ({
	inputProps,
	inputRef,
	removeLatestSelection,
}: TextFieldChipProps) => {
	const tagRef = useRef<HTMLDivElement>(null);
	const focusManager = useFocusManager();

	useEffect(() => {
		function focusInHandler() {
			if (document.activeElement === tagRef.current) {
				inputRef.current?.focus();
			}
		}
		document.addEventListener("focusin", focusInHandler);

		return () => {
			document.removeEventListener("focusin", focusInHandler);
		};
	}, [tagRef, inputRef]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!focusManager) return;
			const tagEl = tagRef.current;
			const inputEl = inputRef.current;

			switch (e.key) {
				case "ArrowLeft":
					if (inputEl.selectionStart === 0 && tagEl) {
						focusManager.focusPrevious({
							from: tagEl,
							wrap: true,
							accept: (node) => {
								const isNodeDisabled =
									node.getAttribute("data-disabled") ===
									"true";
								return (
									!!node.getAttribute("data-focus-ind") &&
									!isNodeDisabled
								);
							},
						});
					}
					break;
				case "Backspace":
					if (inputEl.selectionStart === 0 && tagEl) {
						removeLatestSelection();
					}
					break;
			}
		},
		[focusManager, tagRef, inputRef, removeLatestSelection],
	);

	const mergedInputProps = mergeProps(inputProps, { onKeyDown });

	return (
		<Tag className="outline-hidden" textValue="textField" ref={tagRef}>
			<TextField
				{...mergedInputProps}
				data-value={`${inputProps.value} `}
				className={`inline-grid w-min grid-cols-[0px_min-content] after:invisible after:col-start-2 after:col-end-auto after:row-start-1 after:row-end-auto after:content-[attr(data-value)]`}
			>
				<AriaInput
					className={`col-start-2 col-end-auto row-start-1 row-end-auto w-full min-w-1 text-sm outline-hidden`}
					id="multiple-autocomplete-input"
					ref={inputRef}
					placeholder=""
				/>
			</TextField>
		</Tag>
	);
};

const multipleValueStyles = cva(
	[
		"flex flex-row items-center justify-between",
		"gap-2 w-full min-h-10 pl-3 pr-1",
		"rounded-lg box-border border-2 border-neutral-100",
		"focus-within:border-primary-500!",
		"group-hover:border-primary-400",
	],
	{
		variants: {
			hasError: {
				true: ["border-error-500!"],
				false: [],
			},
			isDisabled: {
				true: ["group-hover:border-neutral-100!", "bg-neutral-100"],
				false: [],
			},
		},
	},
);

const multipleValueLabelStyles = cva(["w-full text-xs font-medium p-1 block"], {
	variants: {
		isDisabled: {
			true: ["text-neutral-700"],
			false: [],
		},
	},
	compoundVariants: [
		{
			isDisabled: false,
			class: ["text-neutral-900"],
		},
	],
});
