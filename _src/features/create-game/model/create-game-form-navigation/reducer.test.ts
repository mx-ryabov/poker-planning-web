import { test, describe, expect } from "vitest";
import {
	createGameFormReducer,
	DefaultCreateGameState,
	CreateGameFormState,
} from "./reducer";
import { CreateGameFormActions } from "./actions";
import { CreateGameFormSteps } from "./types";

describe("Create GameForm Navigation Reducer", () => {
	test("returns the initial state", async () => {
		const initialState = DefaultCreateGameState;
		expect(createGameFormReducer(initialState)).toEqual(initialState);
	});

	test("can enable the next step", async () => {
		const state = createGameFormReducer(DefaultCreateGameState, {
			type: CreateGameFormActions.Type.MakeNextStepEnabled,
			payload: true,
		});
		expect(state.stepData[state.step]).toEqual(
			expect.objectContaining({
				isNextStepEnabled: true,
			}),
		);
	});

	test("can disable the next step", async () => {
		let state = DefaultCreateGameState;
		state = createGameFormReducer(state, {
			type: CreateGameFormActions.Type.MakeNextStepEnabled,
			payload: true,
		});
		state = createGameFormReducer(DefaultCreateGameState, {
			type: CreateGameFormActions.Type.MakeNextStepEnabled,
			payload: false,
		});
		expect(state.stepData[state.step]).toEqual(
			expect.objectContaining({
				isNextStepEnabled: false,
			}),
		);
	});

	test("can move to the next step if the next step is enabled", async () => {
		let state = DefaultCreateGameState;
		const expectedStepsAfterAction = [
			CreateGameFormSteps.VotingSystem,
			CreateGameFormSteps.CreatorName,
			CreateGameFormSteps.AdvancedSettings,
		];
		for (const expectedStep of expectedStepsAfterAction) {
			state = enableNextStep(state);
			state = createGameFormReducer(state, {
				type: CreateGameFormActions.Type.NextStep,
			});
			expect(state).toEqual(
				expect.objectContaining({
					step: expectedStep,
				}),
			);
		}
	});

	test("can move to the prev step if the current step isn't first", async () => {
		let state = DefaultCreateGameState;
		state = enableNextStep(state);
		state = createGameFormReducer(state, {
			type: CreateGameFormActions.Type.NextStep,
		});
		state = createGameFormReducer(state, {
			type: CreateGameFormActions.Type.PrevStep,
		});
		expect(state).toEqual(
			expect.objectContaining({
				step: CreateGameFormSteps.Name,
			}),
		);
		expect(state.stepData[CreateGameFormSteps.Name]).toEqual(
			expect.objectContaining({
				isNextStepEnabled: true,
			}),
		);
	});

	test("can't move to the next step if the next step is disabled", async () => {
		let state = DefaultCreateGameState;
		const expectedStepsAfterAction = [
			CreateGameFormSteps.Name,
			CreateGameFormSteps.VotingSystem,
			CreateGameFormSteps.CreatorName,
		];

		for (let expectedStep of expectedStepsAfterAction) {
			state = createGameFormReducer(state, {
				type: CreateGameFormActions.Type.NextStep,
			});
			expect(state).toEqual(
				expect.objectContaining({
					step: expectedStep,
				}),
			);
			expect(state.stepData[expectedStep]).toEqual(
				expect.objectContaining({
					isNextStepEnabled: false,
				}),
			);
			state = enableNextStep(state);
		}
	});

	test("can make the start game enabled", async () => {
		let state = DefaultCreateGameState;
		state = createGameFormReducer(state, {
			type: CreateGameFormActions.Type.MakeStartGameEnabled,
			payload: true,
		});
		expect(state).toEqual(
			expect.objectContaining({
				isStartGameEnabled: true,
			}),
		);
	});

	test("can make the start game disabled", async () => {
		let state = DefaultCreateGameState;
		state = createGameFormReducer(state, {
			type: CreateGameFormActions.Type.MakeStartGameEnabled,
			payload: true,
		});
		state = createGameFormReducer(state, {
			type: CreateGameFormActions.Type.MakeStartGameEnabled,
			payload: false,
		});
		expect(state).toEqual(
			expect.objectContaining({
				isStartGameEnabled: false,
			}),
		);
	});
});

function enableNextStep(state: CreateGameFormState): CreateGameFormState {
	return createGameFormReducer(state, {
		type: CreateGameFormActions.Type.MakeNextStepEnabled,
		payload: true,
	});
}
