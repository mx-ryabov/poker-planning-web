import { useCallback, useEffect, useRef, useMemo } from "react";
import {
	TicketCreatorSchema,
	TicketCreatorState,
} from "@/_src/pages/game-room/model";
import { TicketType } from "@/_src/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TicketTypeSelector } from "../../ticket-type-selector";
import { Input } from "@/_src/shared/ui/components/input";
import { Button } from "@/_src/shared/ui/components/button";
import { ArrowRightIcon } from "@/_src/shared/ui/components/icon";
import { useTicketCreate } from "@/_src/pages/game-room/model";
import { ErrorBoundary } from "@/_src/shared/ui/components/error-boundary";

type Props = {
	className?: string;
	onSubmitSucceed: () => void;
};

export function TicketCreatorForm({ className, onSubmitSucceed }: Props) {
	return (
		<div className={className}>
			<ErrorBoundary>
				<TicketCreatorFormInner onSubmitSucceed={onSubmitSucceed} />
			</ErrorBoundary>
		</div>
	);
}

function TicketCreatorFormInner({ onSubmitSucceed }: Props) {
	const { onSubmit, isPending, error, control, isValid } =
		useTicketCreatorFormState({ onSubmitSucceed });

	const { formRef, inputRef, focusOnTextField } = useTicketCreatorForm();

	return (
		<form
			className="flex w-full flex-row items-center gap-1 rounded-xl border border-neutral-300 bg-white p-2 shadow-lg"
			data-state="creating"
			onSubmit={onSubmit}
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
				render={({ field, fieldState }) => {
					let fieldError = fieldState.error?.message;
					if (!fieldError && error && error.cause === "validation") {
						fieldError = error.message;
					}

					return (
						<Input
							placeholder="What needs to be done?"
							label=""
							{...field}
							ref={(el) => {
								field.ref(el);
								inputRef.current = el;
							}}
							isDisabled={isPending}
							errors={fieldError}
							errorDefaultOpen
							withErrorIcon
						/>
					);
				}}
			/>

			{isValid && (
				<Button
					shape="square"
					variant="ghost"
					data-testid="ticket-creator-submit"
					isPending={isPending}
					type="submit"
					size="small"
				>
					<ArrowRightIcon size={18} />
				</Button>
			)}
		</form>
	);
}

type UseTicketCreatorFormStateProps = {
	onSubmitSucceed: () => void;
};
function useTicketCreatorFormState({
	onSubmitSucceed,
}: UseTicketCreatorFormStateProps) {
	const { reset, control, formState, handleSubmit } =
		useForm<TicketCreatorState>({
			mode: "onChange",
			defaultValues: {
				title: "",
				type: TicketType.Story,
			},
			resolver: zodResolver(TicketCreatorSchema),
		});

	const {
		isPending,
		error,
		mutate: submitAction,
	} = useTicketCreate({
		onSucceed: () => {
			reset();
			onSubmitSucceed();
		},
		onError: (e) => {
			if (e.cause === "server") {
				throw e;
			}
		},
	});

	const onSubmit = useMemo(
		() => handleSubmit(submitAction),
		[handleSubmit, submitAction],
	);

	return {
		onSubmit,
		isPending,
		error,
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
	};
}
