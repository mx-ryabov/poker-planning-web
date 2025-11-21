export enum GameManagementTab {
	TaskList = "TaskList",
	ParticipantList = "ParticipantList",
	Settings = "Settigns",
}

export type LiveStatus =
	| {
			status: "connected" | "notStarted" | "connecting";
	  }
	| {
			status: "failed";
			reason: Error;
	  }
	| {
			status: "disconnected" | "reconnecting";
			reason?: Error;
	  };
export type LiveStatusUpdaterFn = (prevStatus: LiveStatus) => LiveStatus;
