"use client";
import { Select } from "@/_src/shared/ui";
import { useState } from "react";

export function MainPage() {
	const [selectedItems, setSelectedItems] = useState<React.Key[]>(["2"]);

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="w-48">
				<Select
					label="Select Label"
					placeholder="Select something"
					selectedItems={selectedItems}
					onSelectionChange={setSelectedItems}
				>
					<Select.Item id="1" key="1">
						Item 1
					</Select.Item>
					<Select.Item id="2" key="2">
						Item 2
					</Select.Item>
					<Select.Item id="3" key="3">
						Item 3
					</Select.Item>
				</Select>
			</div>
		</div>
	);
}
