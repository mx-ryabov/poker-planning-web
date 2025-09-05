import {
	useActionState,
	useCallback,
	useEffect,
	useRef,
	KeyboardEvent,
} from "react";
import { useApi } from "@/_src/shared/providers";
import {
	selectCurrentGameId,
	useGameState,
} from "@/_src/pages/game-room/model";
import { TicketType } from "@/_src/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TicketTypeSelector } from "../../ticket-type-selector";
import { Input } from "@/_src/shared/ui/components/input";
import { ButtonSquare, NewButton } from "@/_src/shared/ui/components/button";
import { ArrowRightIcon } from "@/_src/shared/ui/components/icon";
import { GameSchemaBuildersMap } from "@/_src/entities/game";

type Props = {
	className?: string;
	onSubmitSucceed: () => void;
};

export function TicketCreatorForm({ className, onSubmitSucceed }: Props) {
	const { submitAction, isPending, serverError, control, isValid } =
		useTicketCreatorFormState({ onSubmitSucceed });

	const { formRef, inputRef, focusOnTextField, onInputKeyDown } =
		useTicketCreatorForm();

	return (
		<div className={className}>
			<form
				className="flex w-full flex-row items-center gap-1 rounded-xl border border-neutral-300 bg-white p-2 shadow-lg"
				data-state="creating"
				action={submitAction}
				ref={formRef}
				data-testid="ticket-creator-form"
			>
				<Controller
					control={control}
					name="type"
					render={({ field }) => (
						<TicketTypeSelector
							onSelected={(type) => {
								field.onChange(type);
								focusOnTextField();
							}}
							value={field.value}
							isEditable
						/>
					)}
				/>
				<Controller
					control={control}
					name="title"
					render={({ field, fieldState }) => (
						<Input
							placeholder="What needs to be done?"
							label=""
							{...field}
							onKeyDown={onInputKeyDown}
							ref={(el) => {
								field.ref(el);
								inputRef.current = el;
							}}
							isDisabled={isPending}
							errors={fieldState.error?.message || serverError}
							withErrorIcon
						/>
					)}
				/>

				{isValid && (
					<NewButton
						shape="square"
						variant="ghost"
						data-testid="ticket-creator-submit"
						isPending={isPending}
						type="submit"
						size="small"
						className="*:pointer-events-none"
					>
						<ArrowRightIcon size={18} />
					</NewButton>
				)}
			</form>
		</div>
	);
}

/**
 * STATE
 */

const TicketCreatorFormSchema = z.object({
	title: GameSchemaBuildersMap.ticket.title(
		"Don't be silent",
		"Title can't exceed 255 characters.",
	),
	type: GameSchemaBuildersMap.ticket.type(
		"Don't you forgot anything? (Ticket Type)",
	),
});

type TicketCreatorFormState = z.infer<typeof TicketCreatorFormSchema>;

type UseTicketCreatorFormStateProps = {
	onSubmitSucceed: () => void;
};
function useTicketCreatorFormState({
	onSubmitSucceed,
}: UseTicketCreatorFormStateProps) {
	const api = useApi();
	const gameId = useGameState(selectCurrentGameId);
	const addTicketIfAbsent = useGameState((state) => state.addTicketIfAbsent);

	const { reset, control, formState } = useForm<TicketCreatorFormState>({
		mode: "onChange",
		defaultValues: {
			title: "",
			type: TicketType.Story,
		},
		resolver: zodResolver(TicketCreatorFormSchema),
	});

	const action = useCallback(
		async (prevError: string | undefined, formData: FormData) => {
			const data = Object.fromEntries(formData);
			const parsed = TicketCreatorFormSchema.safeParse({
				title: data.title,
				type: +data.type,
			});

			if (parsed.success) {
				try {
					const result = await api.game.ticket.createTicket(
						gameId,
						parsed.data,
					);
					addTicketIfAbsent(result);
					onSubmitSucceed();
					reset();
				} catch (error: unknown) {
					return error instanceof Error
						? error.message
						: String(error);
				}
			}

			return parsed.error?.errors[0].message;
		},
		[onSubmitSucceed, reset, api, gameId, addTicketIfAbsent],
	);

	const [serverError, submitAction, isPending] = useActionState<
		string | undefined,
		FormData
	>(action, undefined);

	return {
		submitAction,
		isPending,
		serverError,
		control,
		isValid: formState.isValid,
	};
}

/**
 * BEHAVIOR
 */

function useTicketCreatorForm() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);

	const onInputKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const form = formRef.current;
			if (e.key === "Enter" && form) {
				const formData = new FormData(form);

				const data = Object.fromEntries(formData);
				const parsed = TicketCreatorFormSchema.safeParse({
					title: data.title,
					type: +data.type,
				});

				if (parsed.success) {
					form.requestSubmit();
				}
				e.preventDefault();
			}
		},
		[formRef],
	);

	const focusOnTextField = useCallback(() => {
		const inputEl = inputRef.current;
		if (inputEl) {
			// setTimeout is needed when we want to focus after selection in ticket type dropdown.
			// since the selection event is fired on mouse down the focus on the selected option happens AFTER we focus on test field
			setTimeout(() => inputEl.focus(), 0);
		}
	}, [inputRef]);

	useEffect(() => {
		focusOnTextField();
	}, [focusOnTextField]);

	return {
		formRef,
		inputRef,
		focusOnTextField,
		onInputKeyDown,
	};
}
