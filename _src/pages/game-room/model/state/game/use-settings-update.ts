import { useApi } from "@/_src/shared/providers";
import { useMutation } from "@/_src/shared/lib";
import { selectCurrentGameId, useGameState } from "../../store";
import { useCallback } from "react";
import {
	UpdateGameSettingsRequest,
	UpdateGameSettingsResponse,
} from "@/_src/shared/api/game-api";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";
import { z } from "zod";

type Props = {
	onMutate?: (variables: UpdateGameSettingsRequest) => void;
	validationSchema?: z.ZodSchema<UpdateGameSettingsRequest>;
};

export function useSettingsUpdate({ validationSchema, onMutate }: Props) {
	const api = useApi();
	const toast = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);

	const updateSettigns = useGameState((state) => state.updateSettings);

	const mutateFn = useCallback(
		(data: UpdateGameSettingsRequest) => {
			return api.game.updateSettings(gameId, data);
		},
		[gameId, api],
	);

	const onError = useCallback(
		(error: Error) => {
			if (!toast) return;

			toast.add(
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
		},
		[updateSettigns],
	);

	return useMutation({
		validationSchema,
		mutateFn,
		onMutate,
		onError,
		onSuccess,
	});
}
