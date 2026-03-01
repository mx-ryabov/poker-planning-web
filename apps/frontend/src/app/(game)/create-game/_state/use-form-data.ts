"use client";
import { GameSchemaBuildersMap } from "@/src/domain/entities/game";
import { useDomainApi } from "@/src/domain/providers";
import { ApiError } from "@/src/shared/lib";
import { useGlobalToast } from "@/src/shared/ui/components/toast";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useActionState } from "react";
import { z } from "zod";

const FormSchema = z.object({
	name: GameSchemaBuildersMap.name(
		"You have to come up with something. The name can't be empty",
		"Statistically, 50 can be painful. For your brain, to perceive the information.",
	),
	votingSystemId: GameSchemaBuildersMap.votingSystemId(
		"Choose a voting system. Otherwise your team won't be happy.",
	),
	creatorName: GameSchemaBuildersMap.participant.name(
		"Don't be shy!",
		"Maybe you have a short name?",
	),
	isAutoRevealCards: GameSchemaBuildersMap.settings.isAutoRevealCards(),
});

export type FormData = z.infer<typeof FormSchema>;

export function useFormData() {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const [formData, setFormData] = useQueryStates({
		name: parseAsString.withDefault(""),
		votingSystemId: parseAsString.withDefault(""),
		creatorName: parseAsString.withDefault(""),
		isAutoRevealCards: parseAsBoolean.withDefault(false),
	});

	const [, action, isPending] = useActionState(
		async () => {
			try {
				await api.game.createGameAsGuest(formData);
			} catch (error) {
				toast?.add({
					title: (error as ApiError).title,
					description: (error as ApiError).message,
					variant: "error",
				});
			}
		},
		void 0,
	);

	const validationResult = FormSchema.safeParse(formData);
	const isFormValid = validationResult.success;
	const errors = validationResult.error?.formErrors.fieldErrors;

	return { formData, setFormData, isFormValid, errors, action, isPending };
}
