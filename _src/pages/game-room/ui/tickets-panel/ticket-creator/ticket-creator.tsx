import { TicketType } from "@/_src/shared/api/game-api";
import { Input } from "@/_src/shared/ui/components/input";
import {
	KeyboardEvent,
	useActionState,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { TicketTypeSelector } from "../ticket-type-selector";
import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { ArrowRightIcon, PlusIcon } from "@/_src/shared/ui/components/icon";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cva } from "class-variance-authority";

export type TicketCreatorSubmitActionData = { title: string; type: TicketType };
export type TicketCreatorRenderFn = (renderProps: {
	state: "button" | "form";
}) => string;

export type TicketCreatorProps = {
	className?: string | TicketCreatorRenderFn;
	onSubmit: (
		data: TicketCreatorSubmitActionData,
	) => Promise<{ ok: boolean; error?: string }>;
};

export function TicketCreator({ className, onSubmit }: TicketCreatorProps) {
	const [focused, setFocused] = useState<boolean>(false);

	const cn = useMemo(() => {
		if (typeof className === "string") {
			return className;
		}
		if (typeof className === "function") {
			return className({ state: focused ? "form" : "button" });
		}
		return "";
	}, [className, focused]);

	const onBlur = useCallback(() => setFocused(false), []);

	return (
		<div
			className={twMerge(
				"flex h-[58px] flex-row items-end justify-end gap-2",
				cn,
			)}
		>
			{focused && (
				<Form
					className="absolute w-full"
					onSubmit={onSubmit}
					onBlur={onBlur}
				/>
			)}
			<ButtonSquare
				icon={PlusIcon}
				data-state="button"
				data-testid="ticket-creator-toggler"
				variant={focused ? "outline" : "default"}
				className={openerStyles({ isOpened: focused })}
				onPress={() => setFocused((prev) => !prev)}
			/>
		</div>
	);
}

const openerStyles = cva("shrink-0 transition-all duration-150 ease-linear", {
	variants: {
		isOpened: {
			true: [
				"-translate-y-17 rounded-full rotate-45 border border-neutral-100 h-8 w-8",
			],
			false: ["shadow-lg shadow-primary-200"],
		},
	},
});

type FormProps = {
	className?: string;
	onSubmit: (
		data: TicketCreatorSubmitActionData,
	) => Promise<{ ok: boolean; error?: string }>;
	onBlur: () => void;
};

function Form({ className, onSubmit, onBlur }: FormProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);
	const editorContainerRef = useRef<HTMLDivElement | null>(null);
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
				const result = await onSubmit(parsed.data);
				reset();
				if (!result.ok) {
					return result.error;
				}
			}

			return parsed.error?.errors[0].message;
		},
		[onSubmit, reset],
	);

	const [serverError, submitAction, isPending] = useActionState<
		string | undefined,
		FormData
	>(action, undefined);

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

	return (
		<div className={className} ref={editorContainerRef}>
			<form
				className="flex w-full flex-row items-center gap-1 rounded-xl border border-neutral-100 bg-white p-2 shadow-lg"
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

				{formState.isValid && (
					<ButtonSquare
						icon={ArrowRightIcon}
						variant="ghost"
						data-testid="ticket-creator-submit"
						isPending={isPending}
						type="submit"
						size="small"
					/>
				)}
			</form>
		</div>
	);
}

const TicketCreatorFormSchema = z.object({
	title: z.string().min(1, "Don't be silent"),
	type: z.nativeEnum(TicketType, {
		required_error: "Don't you forgot anything? (Ticket Type)",
	}),
});

type TicketCreatorFormState = z.infer<typeof TicketCreatorFormSchema>;
