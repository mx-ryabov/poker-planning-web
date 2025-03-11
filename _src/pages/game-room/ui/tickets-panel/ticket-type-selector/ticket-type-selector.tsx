import { TicketType } from "@/_src/shared/api/game-api";
import { Button } from "@/_src/shared/ui/components/button";
import {
	TicketBugIcon,
	TicketStoryIcon,
	TicketTaskIcon,
} from "@/_src/shared/ui/components/icon";
import { Menu } from "@/_src/shared/ui/components/menu";
import { useMemo } from "react";

export type TicketTypeSelectorProps = {
	onSelected: (type: TicketType) => void;
	value: TicketType;
};

export function TicketTypeSelector({
	onSelected,
	value,
}: TicketTypeSelectorProps) {
	const selectedTypeObj = useMemo(
		() => TASK_TYPES.find((t) => t.type === value),
		[value],
	);

	return (
		<Menu>
			<Button
				title=""
				className="px-2"
				contentLeft={selectedTypeObj?.icon}
				variant="ghost"
				size="small"
				data-testid="ticket-type-selector"
			/>
			<Menu.Content
				items={TASK_TYPES}
				selectionMode="single"
				selectedKeys={[value]}
				onAction={(id: string | number) => onSelected(+id)}
			>
				{(taskType) => (
					<Menu.Item key={taskType.type} id={taskType.type}>
						{taskType.icon} {taskType.title}
					</Menu.Item>
				)}
			</Menu.Content>
			<input type="hidden" value={value} name="type" />
		</Menu>
	);
}

const TASK_TYPES = [
	{
		icon: <TicketStoryIcon className="text-success-500" size={18} />,
		title: "Story",
		type: TicketType.Story,
	},
	{
		icon: <TicketTaskIcon className="text-info-500" size={18} />,
		title: "Ticket",
		type: TicketType.Task,
	},
	{
		icon: <TicketBugIcon className="text-error-500" size={18} />,
		title: "Bug",
		type: TicketType.Bug,
	},
];
