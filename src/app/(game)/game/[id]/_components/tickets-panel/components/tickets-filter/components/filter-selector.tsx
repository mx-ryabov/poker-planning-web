import { Button } from "@/src/shared/ui/components/button";
import { Menu } from "@/src/shared/ui/components/menu";
import { cva } from "class-variance-authority";
import { useCallback } from "react";
import { Key } from "react-stately";

type Props<TOption extends { id: Key }> = {
	options: TOption[];
	renderOption: (option: TOption) => React.ReactNode;
	renderSelected: (selected?: TOption) => React.ReactNode;
	onChange: (option: TOption | undefined) => void;
	selectedOptionId: Key | undefined;
	"data-testid": string;
};

export function FilterSelector<TOption extends { id: Key }>({
	options,
	renderOption,
	renderSelected,
	onChange,
	selectedOptionId,
	"data-testid": testIdPrefix,
}: Props<TOption>) {
	const selection = selectedOptionId !== undefined ? [selectedOptionId] : [];

	const onSelectionChange = useCallback(
		(keys: Iterable<Key>) => {
			const key = Array.from(keys)[0];
			const option = options.find((option) => option.id === key);

			onChange(option);
		},
		[options, onChange],
	);

	const selectedOption = options.find(
		(option) => option.id === selectedOptionId,
	);

	return (
		<Menu>
			<Button
				variant="grayed-out"
				className={triggerStyles({
					selected: selectedOption !== undefined,
				})}
				data-testid={`${testIdPrefix}-trigger`}
			>
				<span className="flex flex-row gap-1 items-center">
					{renderSelected(selectedOption)}
				</span>
			</Button>
			<Menu.Content
				items={options}
				selectionMode="single"
				selectedKeys={selection}
				onSelectionChange={onSelectionChange}
				className="p-0.5 min-w-[50px]"
			>
				{(option) => (
					<Menu.Item
						key={option.id}
						id={option.id}
						data-testid={`${testIdPrefix}-option-${String(option.id)}`}
						className="py-1 text-sm"
					>
						{renderOption(option)}
					</Menu.Item>
				)}
			</Menu.Content>
		</Menu>
	);
}

const triggerStyles = cva("h-6 text-xs px-2 min-w-fit", {
	variants: {
		selected: {
			true: "bg-primary-100 text-primary-700",
		},
	},
});
