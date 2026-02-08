import { GameSchemaBuildersMap } from "@/src/domain/entities/game";
import { z } from "zod";
import { useGameState } from "@/src/app/(game)/game/[id]/_store";
import { GameStateStore } from "../../../_store/game-state-store.model";
import { ParticipantRole } from "@/src/domain/entities/game";
import { useMemo, useOptimistic } from "react";
import { buildFieldValidator } from "@/src/shared/lib/utils";
import { useSettingsUpdate } from "@/src/app/(game)/game/[id]/_state";

export function useSettingsPanelState() {
	const data = useGameState(selectSettingsPanelData);

	const [optimisticData, mutateOptimistic] = useOptimistic<
		SettingPanelData,
		Partial<GameSettingsState>
	>(data, (state, action) => ({
		...state,
		...action,
	}));

	const { isPending, mutate, error } = useSettingsUpdate({
		validationSchema: GameSettingsStateSchema,
		onMutate: mutateOptimistic,
	});

	const validator = useMemo(
		() => ({
			name: buildFieldValidator(
				GameSchemaBuildersMap.name(
					"You have to come up with something. The name can't be empty",
					"Statistically, 50 can be painful. For your brain, to perceive the information.",
				),
			),
			autoRevealPeriod: buildFieldValidator(
				GameSchemaBuildersMap.settings.autoRevealPeriod(
					"Enter a positive number. You can't turn back time.",
					"Sorry, but only integers.",
				),
			),
		}),
		[],
	);

	return { data: optimisticData, isPending, mutate, error, validator };
}

export const GameSettingsStateSchema = z.object({
	name: GameSchemaBuildersMap.name(
		"The name can't be empty.",
		"Soo big (i.e. too long).",
	).optional(),
	isAutoRevealCards: GameSchemaBuildersMap.settings
		.isAutoRevealCards()
		.optional(),
	autoRevealPeriod: GameSchemaBuildersMap.settings
		.autoRevealPeriod(
			"Enter a positive number. You can't turn back time.",
			"Sorry, but only integers.",
		)
		.optional(),
	gameMasterId: z.string().uuid().optional(),
});

export type GameSettingsState = z.infer<typeof GameSettingsStateSchema>;

type SettingPanelData = {
	name: string;
	gameMasterId?: string;
	isAutoRevealCards: boolean;
	autoRevealPeriod: number;
};

function selectSettingsPanelData(state: GameStateStore): SettingPanelData {
	const game = state.state.game;
	return {
		name: game.name,
		gameMasterId: game.participants.find(
			(p) => p.role === ParticipantRole.Master,
		)?.id,
		isAutoRevealCards: game.settings.isAutoRevealCards,
		autoRevealPeriod: game.settings.autoRevealPeriod,
	};
}
