import { Controller, useFormContext } from "react-hook-form";
import { CreateGameFormFormState } from "./form";
import { useCallback, useEffect, useRef, KeyboardEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useVotingSystems } from "@/_src/entities/voting-system/model/voting-systems-provider";
import {
	useCreateGameFormNavigationDispatch as useFormNavDispatch,
	CreateGameFormActions as Actions,
	useCreateGameFormNavigation as useFormNavState,
	CreateGameFormSteps,
} from "../../model/create-game-form-navigation";
import { RadioGroup } from "@/_src/shared/ui/components/radio-group";
import { InfoIcon } from "@/_src/shared/ui/components/icon";

gsap.registerPlugin(useGSAP);

export default function VotingSystemStep() {
	const firstRadioRef = useRef<HTMLInputElement>(null);
	const votingSystems = useVotingSystems();

	const formNavigation = useFormNavState();
	const formDispatch = useFormNavDispatch();

	const { control, formState } = useFormContext<CreateGameFormFormState>();
	const container = useRef(null);

	useEffect(() => {
		const firstRadioEl = firstRadioRef.current;
		if (
			formNavigation.step !== CreateGameFormSteps.VotingSystem ||
			!firstRadioEl
		) {
			return;
		}
		firstRadioEl.focus();
	}, [formNavigation.step, firstRadioRef]);

	useEffect(() => {
		formDispatch({
			type: Actions.Type.MakeNextStepEnabled,
			payload:
				!!formState.dirtyFields.votingSystemId &&
				!formState.errors.votingSystemId,
		});
	}, [
		formState.dirtyFields.votingSystemId,
		formState.errors.votingSystemId,
		formDispatch,
	]);

	const nextStep = useCallback(() => {
		const nextStep = formNavigation.stepData.nextStep;
		if (nextStep) {
			formDispatch({ type: Actions.Type.NextStep });
		}
	}, [formDispatch, formNavigation]);

	const onVotingSystemRadioKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Enter") {
				nextStep();
				e.preventDefault();
			}
		},
		[nextStep],
	);

	useGSAP(
		() => {
			gsap.from(".label", { opacity: 0, y: 10, duration: 0.3 });
		},
		{ scope: container },
	);

	return (
		<div
			ref={container}
			className="w-full h-full flex shrink-0 basis-full justify-center pl-[60px] flex-col"
		>
			<Controller
				control={control}
				name="votingSystemId"
				rules={{ required: true }}
				render={({ field }) => (
					<RadioGroup
						variant="content-inside"
						size="large"
						value={field.value}
						onBlur={field.onBlur}
						ref={field.ref}
						onChange={field.onChange}
						name={field.name}
					>
						<RadioGroup.Label className="label">
							Now choose your voting system
						</RadioGroup.Label>
						{votingSystems.map((vs, ind) => (
							<RadioGroup.Radio
								key={vs.id}
								value={vs.id}
								className="label"
								onKeyDown={onVotingSystemRadioKeyDown}
								inputRef={ind === 0 ? firstRadioRef : undefined}
							>
								{vs.name} (
								{vs.votes
									.map((vote) => `${vote.value}`)
									.join(", ")}
								)
							</RadioGroup.Radio>
						))}
						<RadioGroup.Description>
							<InfoIcon /> You can change all settings during the
							game
						</RadioGroup.Description>
					</RadioGroup>
				)}
			/>
		</div>
	);
}
