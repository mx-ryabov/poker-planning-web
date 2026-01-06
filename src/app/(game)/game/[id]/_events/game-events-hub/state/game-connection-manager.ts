"use client";
import {
	HubConnection,
	HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import { HttpTransportType } from "@microsoft/signalr/dist/esm/ITransport";
import {
	CardsRevealedEvent,
	CurrentParticipantUpdatedEvent,
	ConnectionEvent,
	GameEventType,
	NewEstimationAppliedEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
	SettingsUpdatedEvent,
	TicketAddedEvent,
	TicketDeletedEvent,
	TicketUpdatedEvent,
	VotingCancelledEvent,
	VotingFinishedEvent,
	VotingStartedEvent,
} from "../events";
import { logger } from "@/src/shared/lib";

type GameConnectionParams = {
	gameId: string;
	accessTokenFactory: () => Promise<string>;
};

let connection: HubConnection | null = null;

export class GameHubManager {
	private static instance: GameHubManager | null = null;
	private isConnectionCanceled: boolean = false;
	private params: GameConnectionParams;
	private _eventEmitter = new EventTarget();

	get eventEmitter() {
		return this._eventEmitter;
	}

	private constructor(params: GameConnectionParams) {
		this.params = params;
	}

	static getInstance(params: GameConnectionParams): GameHubManager {
		if (!GameHubManager.instance) {
			GameHubManager.instance = new GameHubManager(params);
		} else {
			if (GameHubManager.instance.params.gameId !== params.gameId) {
				GameHubManager.instance.disconnect();
				GameHubManager.instance = new GameHubManager(params);
			}
		}
		return GameHubManager.instance;
	}

	async connect() {
		const { gameId, accessTokenFactory } = this.params;

		const hubConnectionSetup = new HubConnectionBuilder().withUrl(
			`${process.env.NEXT_PUBLIC_HOST}/hubs/game?gameId=${gameId}`,
			{
				transport: HttpTransportType.WebSockets,
				accessTokenFactory,
			},
		);
		hubConnectionSetup.withAutomaticReconnect();

		const conn = hubConnectionSetup.build();
		try {
			this._eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "connecting" }),
			);
			await conn.start();

			if (this.isConnectionCanceled) {
				await conn.stop();
				this.isConnectionCanceled = false;
				return;
			}
			this._eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "connected" }),
			);
			connection = conn;
			this.setSubscriptions();
			this.isConnectionCanceled = false;
		} catch (e) {
			logger.error(e as Error, { gameId: this.params.gameId });
			this._eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "failed", reason: e as Error }),
			);
		}
	}

	async disconnect() {
		this.isConnectionCanceled = true;

		if (connection === null) return;
		if (connection.state === HubConnectionState.Connected) {
			for (const key of Object.keys(GameEventType)) {
				connection.off(key);
			}
			try {
				await connection.stop();
			} catch (e) {
				logger.error(e as Error, { gameId: this.params.gameId });
			}
		}
		connection = null;
	}

	private setSubscriptions() {
		if (!connection || connection.state !== HubConnectionState.Connected) {
			return;
		}

		connection.onreconnecting((error) => {
			this._eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "reconnecting", reason: error }),
			);
		});
		connection.onreconnected(() => {
			this._eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "connected" }),
			);
		});
		connection.onclose((error) => {
			this._eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "disconnected", reason: error }),
			);
		});

		connection.on(GameEventType.ParticipantJoined, (data) => {
			this._eventEmitter.dispatchEvent(new ParticipantJoinedEvent(data));
		});
		connection.on(GameEventType.ParticipantLeft, (data) => {
			this._eventEmitter.dispatchEvent(new ParticipantLeftEvent(data));
		});
		connection.on(GameEventType.TicketAdded, (data) => {
			this._eventEmitter.dispatchEvent(new TicketAddedEvent(data));
		});
		connection.on(GameEventType.TicketUpdated, (data) => {
			this._eventEmitter.dispatchEvent(new TicketUpdatedEvent(data));
		});
		connection.on(GameEventType.NewEstimationApplied, (data) => {
			this._eventEmitter.dispatchEvent(
				new NewEstimationAppliedEvent(data),
			);
		});
		connection.on(GameEventType.TicketDeleted, (data) => {
			this._eventEmitter.dispatchEvent(new TicketDeletedEvent(data));
		});

		connection.on(GameEventType.VotingStarted, (data) => {
			this._eventEmitter.dispatchEvent(new VotingStartedEvent(data));
		});
		connection.on(GameEventType.CardsRevealed, () => {
			this._eventEmitter.dispatchEvent(new CardsRevealedEvent());
		});
		connection.on(GameEventType.VotingCancelled, () => {
			this._eventEmitter.dispatchEvent(new VotingCancelledEvent());
		});
		connection.on(GameEventType.VotingFinished, (votingResult) => {
			this._eventEmitter.dispatchEvent(
				new VotingFinishedEvent(votingResult),
			);
		});
		connection.on(GameEventType.ParticipantVoted, (data) => {
			this._eventEmitter.dispatchEvent(new ParticipantVotedEvent(data));
		});

		connection.on(GameEventType.SettingsUpdated, (data) => {
			this._eventEmitter.dispatchEvent(new SettingsUpdatedEvent(data));
		});
		connection.on(GameEventType.CurrentParticipantUpdated, (data) => {
			this._eventEmitter.dispatchEvent(
				new CurrentParticipantUpdatedEvent(data),
			);
		});
	}
}
