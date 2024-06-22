"use client";
import { Select } from "@/_src/shared/ui";

export function MainPage() {
	return (
		<div className="flex flex-col h-screen items-center">
			<div className="w-[300px]">
				<Select
					label="Select Multiple"
					selectionMode="multiple"
					aria-label="Select Multiple"
					items={dataMultiple}
				>
					{(item) => (
						<Select.Item
							key={item.id}
							aria-label={`Item ${item.textValue}`}
							textValue={item.textValue}
						>
							{item.textValue}
						</Select.Item>
					)}
				</Select>
			</div>
		</div>
	);
}

const dataMultiple = [
	{ id: 1, textValue: "Item 1" },
	{ id: 2, textValue: "Item 2" },
	{ id: 3, textValue: "Item 3" },
	{ id: 4, textValue: "Item 4" },
	{ id: 5, textValue: "Item 5" },
	{ id: 6, textValue: "Item 6" },
	{ id: 7, textValue: "Item 7" },
	{ id: 8, textValue: "Item 8" },
	{ id: 9, textValue: "Item 9" },
	{ id: 10, textValue: "Item 10" },
	{ id: 11, textValue: "Item 11" },
	{ id: 12, textValue: "Item 12" },
	{ id: 13, textValue: "Item 13" },
	{ id: 14, textValue: "Item 14" },
	{ id: 15, textValue: "Item 15" },
	{ id: 16, textValue: "Item 16" },
	{ id: 17, textValue: "Item 17" },
];
