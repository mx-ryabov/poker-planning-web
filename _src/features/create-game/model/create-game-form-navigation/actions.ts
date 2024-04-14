import { ActionsSet } from "@/src/shared/lib/types/local-state-types";

export namespace CreateGameFormActions {
	export enum Type {
		NextStep = "CREATE_GAME_FORM_NEXT_STEP",
		PrevStep = "CREATE_GAME_FORM_PREV_STEP",
		MakeNextStepAvailable = "MAKE_NEXT_STEP_AVAILABLE",
	}

	export type Payload = {
		[Type.NextStep]: undefined;
		[Type.PrevStep]: undefined;
		[Type.MakeNextStepAvailable]: boolean;
	};

	export type Actions = ActionsSet<Payload>;
}
