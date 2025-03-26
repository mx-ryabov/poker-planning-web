import { GameTicket } from "@/_src/shared/api/game-api";
import { Button, ButtonSquare } from "@/_src/shared/ui/components/button";
import { CardsIcon } from "@/_src/shared/ui/components/icon/svg/cards.icon";
import { MinusIcon } from "@/_src/shared/ui/components/icon/svg/minus.icon";
import { Tooltip } from "@/_src/shared/ui/components/tooltip";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	InlineEditableTextarea,
	InlineEditableTextField,
} from "@/_src/shared/ui/components/inline-editable-fields";
import { TicketTypeSelector } from "../../ticket-type-selector";
import { TicketItemMenu } from "./ticket-item-menu";
import {
	TicketItemState,
	TicketItemStateSchema,
	useTicketUpdate,
} from "@/_src/pages/game-room/model";

type Props = {
	data: GameTicket;
	isEditable: boolean;
	deleteTicket: () => void;
	onClose: () => void;
};

export function TicketItemFullView(props: Props) {
	const { data, isEditable, deleteTicket, onClose } = props;

	const { control } = useForm<TicketItemState>({
		mode: "onChange",
		resolver: zodResolver(TicketItemStateSchema),
		disabled: !isEditable,
	});

	const { optimisticData: state, updateByField } = useTicketUpdate(data);

	if (!state) return null;

	return (
		<div
			className="flex w-full flex-col gap-4 rounded-xl border border-neutral-200 px-4 py-3 text-neutral-500"
			data-testid="ticket-list-item-full-view"
		>
			<div className="flex flex-col gap-1">
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-row items-center gap-2">
						<div className="-ml-2">
							{data.type !== undefined && (
								<TicketTypeSelector
									value={data.type}
									onSelected={(value) =>
										updateByField("type", value)
									}
									isEditable={isEditable}
								/>
							)}
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
								data-testid="collapse-button"
								onPress={onClose}
							/>
							<Tooltip.Content>Collapse</Tooltip.Content>
						</Tooltip>
						<Tooltip delay={1000}>
							<TicketItemMenu deleteTicket={deleteTicket} />
							<Tooltip.Content>Options</Tooltip.Content>
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
							id="ticket-title"
							isDisabled={!isEditable}
							error={fieldState.error?.message}
							keepEditViewOpenOnBlur={false}
							shouldConfirmOnEnter
							onEditorChange={field.onChange}
							rows={1}
							onConfirm={(value) => {
								updateByField("title", value);
							}}
						/>
					)}
				/>
				{isEditable && (
					<Button
						title="Vote"
						contentLeft={<CardsIcon size={18} />}
						size="small"
						variant="grayed-out"
						className="text-primary-500 rounded-lg drop-shadow-none"
					/>
				)}
			</div>

			<div className="flex flex-col gap-1">
				<InlineEditableTextarea
					label="Description"
					value={state.description || ""}
					placeholder={!isEditable ? "Empty" : "Edit description"}
					isDisabled={!isEditable}
					id="ticket-description"
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
					onConfirm={(value) => updateByField("description", value)}
				/>
			</div>

			<div className="flex flex-col">
				<p className="text-base font-medium text-neutral-900">
					Details
				</p>
				<div className="flex flex-row items-center justify-between">
					<p className="text-sm font-medium">Story Points</p>
					<div className="w-12">
						<InlineEditableTextField
							value={state.estimation || ""}
							placeholder="None"
							id="ticket-estimation"
							isDisabled={!isEditable}
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
							onConfirm={(value) =>
								updateByField("estimation", value)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
