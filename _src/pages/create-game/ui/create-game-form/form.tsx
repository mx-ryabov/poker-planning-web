"use client";
import { useRef } from "react";
import { FormFooter } from "./components/footer/footer";
import { FormHeader } from "./components/header";
import { GameNameStep } from "./components/steps/game-name-step";
import { VotingSystemStep } from "./components/steps/voting-system-step";
import { PersonalInfoStep } from "./components/steps/personal-info-step";
import { AdvancedSettingsStep } from "./components/steps/advanced-settings-step";
import { useFormData } from "../../model/use-form-data";
import { useFormNavigation } from "../../model";

export const CreateGameForm = () => {
	const formRef = useRef<HTMLFormElement | null>(null);

	const { formData, setFormData, action, isPending, isFormValid, errors } =
		useFormData();
	const { state: navState, actions: navActions } = useFormNavigation({
		errors,
	});

	const submitForm = () => {
		if (isFormValid) formRef.current?.requestSubmit();
	};

	return (
		<form className="flex h-full w-full" action={action} ref={formRef}>
			<FormHeader currentStepNumber={navState.stepData.number} />
			<div className="w-full h-full flex flex-row px-10" role="group">
				<div className="w-full h-full flex flex-col shrink-0 basis-full justify-center px-10">
					{navState.formStep === "gameName" && (
						<GameNameStep
							nameValue={formData.name}
							onNameChange={(value) => {
								setFormData({ name: value });
							}}
							onEnterPress={navActions.goNextStep}
							nameError={errors?.name?.[0]}
						/>
					)}
					{navState.formStep === "votingSystem" && (
						<VotingSystemStep
							votingSystemId={formData.votingSystemId}
							onVotingSystemIdChange={(id) =>
								setFormData({ votingSystemId: id })
							}
							goNextStep={navActions.goNextStep}
						/>
					)}
					{navState.formStep === "personalInfo" && (
						<PersonalInfoStep
							creatorName={formData.creatorName}
							onCreatorNameChange={(creatorName) =>
								setFormData({ creatorName })
							}
							errorCreatorName={errors?.creatorName?.[0]}
							onCreatorNameEnter={submitForm}
						/>
					)}
					{navState.formStep === "advancedSettings" && (
						<AdvancedSettingsStep
							isAutoRevealCards={formData.isAutoRevealCards}
							onIsAutoRevealCardsChange={(isAutoRevealCards) =>
								setFormData({ isAutoRevealCards })
							}
						/>
					)}
				</div>
			</div>
			<FormFooter
				navState={navState}
				actions={navActions}
				formState={{ isFormValid, isPending }}
			/>
		</form>
	);
};
