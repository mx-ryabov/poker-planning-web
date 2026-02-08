export type UpdateGameSettingsRequest = {
	name?: string;
	isAutoRevealCards?: boolean;
	autoRevealPeriod?: number;
	gameMasterId?: string;
};
