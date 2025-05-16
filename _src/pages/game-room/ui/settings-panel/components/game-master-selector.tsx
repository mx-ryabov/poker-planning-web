import { Select } from "@/_src/shared/ui/components/select";
import {
	selectCurrentParticipantId,
	selectParticipants,
	useGameState,
} from "../../../model";
import { useCallback, useMemo } from "react";
import { Selection } from "@react-types/shared";
import { GameParticipant } from "@/_src/shared/api";

type Props = {
	isReadonly: boolean;
	selectedItemId: string | undefined;
	onChange: (newMasterId: string) => void;
};

export function GameMasterSelector({
	isReadonly,
	selectedItemId,
	onChange,
}: Props) {
	const currentParticipantId = useGameState(selectCurrentParticipantId);
	const participants = useGameState(selectParticipants);

	const selectedKeys = useMemo(
		() => (selectedItemId ? [selectedItemId] : []),
		[selectedItemId],
	);

	const onSelectionChange = useCallback(
		(keys: Selection) => {
			const keysArr = Array.from(keys);
			if (keysArr.length !== 1) return;
			const newMasterId: string = String(keysArr[0]);
			onChange(newMasterId);
		},
		[onChange],
	);

	return (
		<Select
			items={participants}
			label="Game master"
			selectionMode="single"
			selectedKeys={selectedKeys}
			onSelectionChange={onSelectionChange}
			isDisabled={isReadonly}
			aria-label="Game master"
			id="game-master-selector"
		>
			{(p) => (
				<Select.Item
					key={p.id}
					id={p.id}
					textValue={getTextValue(p, currentParticipantId)}
				>
					{getTextValue(p, currentParticipantId)}
				</Select.Item>
			)}
		</Select>
	);
}

function getTextValue(p: GameParticipant, currentParticipantId: string) {
	let result = p.displayName;
	if (currentParticipantId === p.id) result += " (You)";
	return result;
}
