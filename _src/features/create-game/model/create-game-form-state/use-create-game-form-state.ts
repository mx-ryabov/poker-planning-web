import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//export type CreateGameFormFormState = CreateGameRequest;

const CreateGameFormSchema = z.object({
	name: z
		.string()
		.min(1, "You have to come up with something. The name can't be empty")
		.max(
			50,
			"Statistically, 50 can be painful. For your brain, to perceive the information.",
		),
	votingSystemId: z
		.string({
			required_error:
				"Choose a voting system. Otherwise your team won't be happy.",
		})
		.uuid(),
	creatorName: z
		.string()
		.min(1, "Don't be shy!")
		.max(50, "Maybe you have a short name?"),
	isAutoRevealCards: z.boolean(),
});

export type CreateGameFormFormState = z.infer<typeof CreateGameFormSchema>;

export type UseCreateGameFormStateProps = {
	onSubmitAction: (_formState: CreateGameFormFormState) => Promise<void>;
};

export function useCreateGameFormState(props: UseCreateGameFormStateProps) {
	const { onSubmitAction } = props;

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

	const onSubmit = useCallback(
		async (formState: CreateGameFormFormState) => {
			console.log("Submitted form state: ", formState);

			if (formState.name === "abra cadabra") {
				await onSubmitAction(formState);
			}
		},
		[onSubmitAction],
	);

	return { methods, onSubmit };
}
