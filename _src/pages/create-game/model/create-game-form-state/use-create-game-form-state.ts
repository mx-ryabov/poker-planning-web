import { StringHelper } from "@/_src/shared/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateGameFormSchema = z.object({
	name: z
		.string()
		.min(1, "You have to come up with something. The name can't be empty")
		.max(
			50,
			"Statistically, 50 can be painful. For your brain, to perceive the information.",
		)
		.transform((val) => StringHelper.cleanUpString(val)),
	votingSystemId: z
		.string({
			required_error:
				"Choose a voting system. Otherwise your team won't be happy.",
		})
		.uuid(),
	creatorName: z
		.string()
		.min(1, "Don't be shy!")
		.max(50, "Maybe you have a short name?")
		.transform((val) =>
			StringHelper.cleanUpString(val, { onlyWords: true }),
		),
	isAutoRevealCards: z.boolean().optional(),
});

export type CreateGameFormFormState = z.infer<typeof CreateGameFormSchema>;

export type UseCreateGameFormStateProps = {
	onSubmitAction: (_formState: CreateGameFormFormState) => Promise<string>;
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

	const formActionHandler = async (
		_prevState: string,
		formData: FormData,
	) => {
		const data = Object.fromEntries(formData);
		const parsed = CreateGameFormSchema.safeParse({
			...data,
			isAutoRevealCards: data.isAutoRevealCards === "true",
		});

		if (parsed.success) {
			return await onSubmitAction(parsed.data);
		}
		return parsed.error.message;
	};

	const [, formAction, isPending] = useActionState(formActionHandler, "");

	return { clientFormMethods: methods, action: formAction, isPending };
}
