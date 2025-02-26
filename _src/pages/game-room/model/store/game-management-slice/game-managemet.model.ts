export enum GameManagementTab {
	TaskList = "TaskList",
	ParticipantList = "ParticipantList",
	Settings = "Settigns",
}

export type LiveStatus = {
	state: "connected" | "reconnecting" | "disconnected";
	reason?: Error;
};
export type LiveStatusUpdaterFn = (prevStatus: LiveStatus) => LiveStatus;
