/* eslint-disable no-unused-vars */
import { ActionsSet } from "@/_src/shared/lib";

export namespace CreateGameFormActions {
	export enum Type {
		NextStep = "CREATE_GAME_FORM_NEXT_STEP",
		PrevStep = "CREATE_GAME_FORM_PREV_STEP",
		MakeNextStepEnabled = "MAKE_NEXT_STEP_ENABLED",
		MakeStartGameEnabled = "MAKE_START_GAME_ENABLED",
	}

	export type Payload = {
		[Type.NextStep]: undefined;
		[Type.PrevStep]: undefined;
		[Type.MakeNextStepEnabled]: boolean;
		[Type.MakeStartGameEnabled]: boolean;
	};

	export type Actions = ActionsSet<Payload>;
}
