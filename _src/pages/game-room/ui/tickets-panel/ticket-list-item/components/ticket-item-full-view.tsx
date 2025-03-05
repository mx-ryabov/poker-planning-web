import {
	GameTicket,
	TicketType,
	updateTicketById,
} from "@/_src/shared/api/game-api";
import { Button, ButtonSquare } from "@/_src/shared/ui/components/button";
import { CardsIcon } from "@/_src/shared/ui/components/icon/svg/cards.icon";
import { TicketBugIcon } from "@/_src/shared/ui/components/icon/svg/ticket-bug.icon";
import { TicketStoryIcon } from "@/_src/shared/ui/components/icon/svg/ticket-story.icon";
import { TicketTaskIcon } from "@/_src/shared/ui/components/icon/svg/ticket-task.icon";
import { ReactNode, useEffect } from "react";
import {
	TicketItemState,
	TicketItemStateSchema,
	UpdateTicketAction,
	useTicketItemState,
} from "../state/use-ticket-item-state";
import {
	selectCurrentGameId,
	useGameState,
} from "@/_src/pages/game-room/model";
import { MinusIcon } from "@/_src/shared/ui/components/icon/svg/minus.icon";
import { Tooltip } from "@/_src/shared/ui/components/tooltip";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	InlineEditableTextarea,
	InlineEditableTextField,
} from "@/_src/shared/ui/components/inline-editable-fields";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

type Props = {
	data: GameTicket;
	isReadOnly?: boolean;
	onClose: () => void;
};

export function TicketItemFullView({ data, isReadOnly, onClose }: Props) {
	const toastState = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);
	const updateTicket = useGameState((state) => state.updateTicket);

	const { control } = useForm<TicketItemState>({
		mode: "onChange",
		resolver: zodResolver(TicketItemStateSchema),
		disabled: isReadOnly,
	});

	const updateTicketAction: UpdateTicketAction = async (updatedData) => {
		if (isReadOnly) return;
		try {
			const resData = await updateTicketById(
				gameId,
				data.id,
				updatedData,
			);
			updateTicket(data.id, resData);
		} catch (e) {
			toastState?.add({
				title: `Server Error`,
				description: `${e instanceof Error ? e.message : e}`,
				variant: "error",
			});
			throw e;
		}
	};

	const { state, update } = useTicketItemState(data, updateTicketAction);

	return (
		<div
			className="w-full flex flex-col gap-4 border border-neutral-100 px-4 py-3 rounded-xl text-neutral-500"
			data-testid="ticket-list-item-full-view"
		>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-row items-center gap-2">
						<div>
							{data.type !== undefined
								? TicketTypeToIconMap[data.type]
								: null}
						</div>
						<span className="text-xs text-neutral-300">
							{data.identifier}
						</span>
					</div>
					<div className="flex flex-row">
						<Tooltip delay={1000}>
							<ButtonSquare
								icon={MinusIcon}
								variant="ghost"
								size="small"
								onPress={onClose}
							/>
							<Tooltip.Content>Collapse</Tooltip.Content>
						</Tooltip>
					</div>
				</div>
				<Controller
					control={control}
					name="title"
					render={({ field, fieldState }) => (
						<InlineEditableTextarea
							value={state.title}
							styles={{
								readView: {
									textSize: "large",
									size: "large",
									compensatedOffset: true,
								},
								editorView: {
									textSize: "large",
									compensatedOffset: true,
								},
							}}
							isDisabled={isReadOnly}
							error={fieldState.error?.message}
							keepEditViewOpenOnBlur={false}
							shouldConfirmOnEnter
							onEditorChange={field.onChange}
							rows={1}
							onConfirm={(value) => update("title", value)}
						/>
					)}
				/>
				{!isReadOnly && (
					<Button
						title="Vote"
						contentLeft={<CardsIcon size={18} />}
						size="small"
						variant="grayed-out"
						className="drop-shadow-none rounded-lg text-primary-500"
					/>
				)}
			</div>

			<div className="flex flex-col gap-1">
				<InlineEditableTextarea
					label="Description"
					value={state.description || ""}
					placeholder={isReadOnly ? "Empty" : "Edit description"}
					isDisabled={isReadOnly}
					styles={{
						readView: {
							textSize: "medium",
							compensatedOffset: true,
						},
						editorView: {
							textSize: "medium",
							compensatedOffset: true,
						},
					}}
					onConfirm={(value) => update("description", value)}
				/>
			</div>

			<div className="flex flex-col">
				<p className="text-base font-medium text-neutral-900">
					Details
				</p>
				<div className="flex flex-row justify-between items-center">
					<p className="font-medium text-sm">Story Points</p>
					<div className="w-16">
						<InlineEditableTextField
							value={state.estimation || ""}
							placeholder="None"
							isDisabled={isReadOnly}
							styles={{
								readView: {
									textSize: "medium",
									size: "medium",
								},
								editorView: {
									textSize: "medium",
									size: "medium",
								},
							}}
							onConfirm={(value) => update("estimation", value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

const TicketTypeToIconMap: Record<TicketType, ReactNode> = {
	[TicketType.Story]: (
		<TicketStoryIcon size={20} className="text-success-500" />
	),
	[TicketType.Bug]: <TicketBugIcon size={20} className="text-error-500" />,
	[TicketType.Task]: <TicketTaskIcon size={20} className="text-info-500" />,
};
