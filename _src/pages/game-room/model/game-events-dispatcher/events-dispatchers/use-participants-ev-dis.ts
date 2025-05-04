import { StoreApi, useStore } from "zustand";
import { GameStateStore } from "../../store/game-state-store.model";
import {
	EventSubscriber,
	GameEventType,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
} from "../../game-events-hub";
import { useEffect } from "react";

type Props = {
	eventSubscriber: EventSubscriber;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useParticipantsEvDis({
	eventSubscriber,
	gameStateStore,
}: Props) {
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

	useEffect(() => {
		const handler = ({ payload }: ParticipantJoinedEvent) => {
			joinParticipant(payload);
		};

		return eventSubscriber(GameEventType.ParticipantJoined, handler);
	}, [eventSubscriber, joinParticipant]);

	useEffect(() => {
		const handler = ({ payload }: ParticipantLeftEvent) => {
			console.log("left", payload.userId);
			disconnectParticipant(payload.userId);
		};

		return eventSubscriber(GameEventType.ParticipantLeft, handler);
	}, [eventSubscriber, disconnectParticipant]);

	useEffect(() => {
		const handler = ({ payload }: ParticipantVotedEvent) => {
			console.log(payload.participantId, payload.voteId);

			changeVoteForParticipant(payload.participantId, payload.voteId);
		};

		return eventSubscriber(GameEventType.ParticipantVoted, handler);
	}, [eventSubscriber, changeVoteForParticipant]);
}
