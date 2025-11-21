import { StoreApi, useStore } from "zustand";
import { GameStateStore } from "../../store/game-state-store.model";
import {
	CurrentParticipantUpdatedEvent,
	EventSubscriber,
	GameEventType,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
} from "../../game-events-hub";
import { useEffect } from "react";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";
import { GameParticipant } from "@/_src/shared/api";
import { GameParticipantRoleNames } from "../../constants";

type Props = {
	eventSubscriber: EventSubscriber;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useParticipantsEvDis({
	eventSubscriber,
	gameStateStore,
}: Props) {
	const toast = useGlobalToast();
	const joinParticipant = useStore(
		gameStateStore,
		(state) => state.joinParticipant,
	);
	const disconnectParticipant = useStore(
		gameStateStore,
		(state) => state.disconnectParticipant,
	);
	const changeVoteForParticipant = useStore(
		gameStateStore,
		(state) => state.changeVoteForParticipant,
	);

	const updateCurrentParticipant = useStore(
		gameStateStore,
		(state) => state.updateCurrentParticipant,
	);

	useEffect(() => {
		const handler = ({ payload }: ParticipantJoinedEvent) => {
			joinParticipant(payload);
		};

		return eventSubscriber(GameEventType.ParticipantJoined, handler);
	}, [eventSubscriber, joinParticipant]);

	useEffect(() => {
		const handler = ({ payload }: ParticipantLeftEvent) => {
			disconnectParticipant(payload.userId);
		};

		return eventSubscriber(GameEventType.ParticipantLeft, handler);
	}, [eventSubscriber, disconnectParticipant]);

	useEffect(() => {
		const handler = ({ payload }: ParticipantVotedEvent) => {
			changeVoteForParticipant(payload.participantId, payload.voteId);
		};

		return eventSubscriber(GameEventType.ParticipantVoted, handler);
	}, [eventSubscriber, changeVoteForParticipant]);

	useEffect(() => {
		const onUpdate = (
			oldData: GameParticipant,
			newData: GameParticipant,
		) => {
			if (oldData.role !== newData.role) {
				toast?.add({
					title: "Your role has been updated!",
					variant: "info",
					description: `Your new role is ${GameParticipantRoleNames[newData.role]}`,
				});
			}
		};
		const handler = ({ payload }: CurrentParticipantUpdatedEvent) => {
			updateCurrentParticipant(payload, onUpdate);
		};

		return eventSubscriber(
			GameEventType.CurrentParticipantUpdated,
			handler,
		);
	}, [eventSubscriber, updateCurrentParticipant, toast?.add]);
}
