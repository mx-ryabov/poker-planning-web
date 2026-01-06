import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";
import { GameActions } from "@/src/domain/entities/game";
import { GameMasterSelector } from "./components/game-master-selector";
import { AutoRevealCardsField } from "./components/auto-reveal-cards-field";
import { useSettingsPanelState } from "./state/use-settings-panel-state";
import { GameNameField } from "./components/game-name-field";

export function SettingsPanel() {
	const isEditable = useGamePermissions(GameActions.ChangeGameSettings);
	const { data, mutate, validator } = useSettingsPanelState();

	return (
		<div className="flex flex-col gap-4">
			<GameNameField
				value={data.name}
				validate={validator.name}
				onConfirm={(value) => {
					mutate({ name: value });
				}}
				isReadonly={!isEditable}
			/>
			<GameMasterSelector
				isReadonly={!isEditable}
				selectedItemId={data.gameMasterId}
				onChange={(gameMasterId) => {
					mutate({ gameMasterId });
				}}
			/>
			<AutoRevealCardsField
				value={{
					isAutoRevealCards: data.isAutoRevealCards,
					autoRevealPeriod: data.autoRevealPeriod,
				}}
				onChange={(value) => {
					mutate({ ...value });
				}}
				autoRevealPeriodValidate={validator.autoRevealPeriod}
				isReadonly={!isEditable}
			/>
		</div>
	);
}
