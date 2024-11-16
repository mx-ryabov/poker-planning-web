import { Controller, useFormContext } from "react-hook-form";
import { useCallback, useEffect, useRef, KeyboardEvent } from "react";
import { useVotingSystems } from "@/_src/entities/voting-system/model/voting-systems-provider";
import { RadioGroup } from "@/_src/shared/ui/components/radio-group";
import { InfoIcon } from "@/_src/shared/ui/components/icon";
import { CreateGameFormFormState } from "../../../../model";
import { StepProps } from "./types";

//gsap.registerPlugin(useGSAP);

export function VotingSystemStep({
	isActive,
	onValidate,
	onNextStep,
}: StepProps) {
	const firstRadioRef = useRef<HTMLInputElement>(null);
	const votingSystems = useVotingSystems();

	const { control, formState } = useFormContext<CreateGameFormFormState>();
	const container = useRef(null);

	useEffect(() => {
		const firstRadioEl = firstRadioRef.current;
		if (isActive && firstRadioEl) {
			firstRadioEl.focus();
		}
	}, [isActive, firstRadioRef]);

	useEffect(() => {
		const isStepValid =
			!!formState.dirtyFields.votingSystemId &&
			!formState.errors.votingSystemId;
		onValidate(isStepValid);
	}, [
		formState.dirtyFields.votingSystemId,
		formState.errors.votingSystemId,
		onValidate,
	]);

	const onVotingSystemRadioKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Enter") {
				onNextStep();
				e.preventDefault();
			}
		},
		[onNextStep],
	);

	// useGSAP(
	// 	() => {
	// 		gsap.from(".label", { opacity: 0, y: 10, duration: 0.3 });
	// 	},
	// 	{ scope: container },
	// );

	return (
		<div
			ref={container}
			className="w-full h-full flex shrink-0 basis-full justify-center pl-10 flex-col"
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
						<RadioGroup.Label
							className="label"
							data-testid="voting-systems-field-label"
						>
							Now choose your voting system
						</RadioGroup.Label>
						{votingSystems.map((vs, ind) => (
							<RadioGroup.Radio
								key={vs.id}
								value={vs.id}
								className="label"
								data-testid="voting-system-option-container"
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
						<RadioGroup.Description data-testid="voting-systems-field-description">
							<InfoIcon /> You can change all settings during the
							game
						</RadioGroup.Description>
					</RadioGroup>
				)}
			/>
		</div>
	);
}
