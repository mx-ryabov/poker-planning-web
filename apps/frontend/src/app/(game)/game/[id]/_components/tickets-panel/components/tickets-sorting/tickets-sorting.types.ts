export type SortingId =
	| "newest"
	| "oldest"
	| "lowest-to-highest"
	| "highest-to-lowest";

export type SortingOption = {
	id: SortingId;
	label: string;
};

export type SortingGroup = {
	id: string;
	label: string;
	options: SortingOption[];
};
