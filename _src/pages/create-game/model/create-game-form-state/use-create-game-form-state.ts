import { GameSchemaBuildersMap } from "@/_src/entities/game";
import { ApiError } from "@/_src/shared/lib";
import { useApi } from "@/_src/shared/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateGameFormSchema = z.object({
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

export type CreateGameFormFormState = z.infer<typeof CreateGameFormSchema>;

export type UseCreateGameFormStateProps = {
	onError: (error: ApiError) => void;
};
export function useCreateGameFormState({
	onError,
}: UseCreateGameFormStateProps) {
	const api = useApi();

	const methods = useForm<CreateGameFormFormState>({
		mode: "onChange",
		defaultValues: {
			name: "",
			votingSystemId: "",
			creatorName: "",
			isAutoRevealCards: false,
		},
		resolver: zodResolver(CreateGameFormSchema),
	});

	const formActionHandler = async (
		_: string | undefined,
		formData: FormData,
	) => {
		const data = Object.fromEntries(formData);
		const parsed = CreateGameFormSchema.safeParse({
			...data,
			isAutoRevealCards: data.isAutoRevealCards === "true",
		});

		if (parsed.success) {
			try {
				await api.game.createGameAsGuest(parsed.data);
			} catch (error) {
				if (error instanceof ApiError) {
					onError(error);
					return error.message;
				}
				return String(error);
			}
			return "";
		}

		return parsed.error.message;
	};

	const [error, formAction, isPending] = useActionState(
		formActionHandler,
		undefined,
	);

	return { clientFormMethods: methods, action: formAction, isPending, error };
}
