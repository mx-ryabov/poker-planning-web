import { useDomainApi } from "@/src/domain/providers";
import { useMutation } from "@/src/shared/lib";
import {
	selectCurrentGameId,
	selectCurrentParticipantId,
	useGameState,
} from "../../_store";
import { useCallback } from "react";
import {
	UpdateGameSettingsRequest,
	UpdateGameSettingsResponse,
} from "@/src/domain/entities/game";
import { useGlobalToast } from "@/src/shared/ui/components/toast";
import { z } from "zod";

export type UseSettingsUpdateProps = {
	onMutate?: (variables: UpdateGameSettingsRequest) => void;
	validationSchema?: z.ZodSchema<UpdateGameSettingsRequest>;
};

export function useSettingsUpdate({
	validationSchema,
	onMutate,
}: UseSettingsUpdateProps) {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);
	const currentParticipantId = useGameState(selectCurrentParticipantId);

	const updateSettigns = useGameState((state) => state.updateSettings);
	const updateCurrentParticipant = useGameState(
		(state) => state.updateCurrentParticipant,
	);

	const mutateFn = useCallback(
		async (data: UpdateGameSettingsRequest) =>
			api.game.updateSettings(gameId, data),
		[gameId, api],
	);

	const onError = useCallback(
		(error: Error) => {
			if (!toast?.add) return;

			toast?.add(
				{
					title: "Game settings update has failed.",
					description: error.message,
					variant: "error",
				},
				{ timeout: 5000 },
			);
		},
		[toast],
	);

	const onSuccess = useCallback(
		(data: UpdateGameSettingsResponse) => {
			updateSettigns(data);
			const currentParticipant = data.updatedParticipants.find(
				(p) => p.id === currentParticipantId,
			);
			if (currentParticipant) {
				updateCurrentParticipant(currentParticipant);
			}
		},
		[updateSettigns, updateCurrentParticipant, currentParticipantId],
	);

	return useMutation({
		validationSchema,
		mutateFn,
		onMutate,
		onError,
		onSuccess,
	});
}
