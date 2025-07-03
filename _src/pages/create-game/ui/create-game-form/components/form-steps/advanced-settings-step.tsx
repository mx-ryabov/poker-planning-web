import { InfoIcon } from "@/_src/shared/ui/components/icon";
import { Switch } from "@/_src/shared/ui/components/switch";
import { Controller, useFormContext } from "react-hook-form";
import { CreateGameFormFormState } from "../../../../model";
import { StepProps } from "./types";

export function AdvancedSettingsStep(_: StepProps) {
	const { control } = useFormContext<CreateGameFormFormState>();
	return (
		<div className="flex h-full w-full shrink-0 basis-full flex-col justify-center pl-10">
			<p className="label mb-4 text-lg text-neutral-900">
				Advanced settings
			</p>
			<div
				className="mb-6 flex flex-col"
				data-testid="advanced-settings-fields-container"
			>
				<Controller
					control={control}
					name="isAutoRevealCards"
					render={({ field }) => (
						<Switch
							label="Auto-reveal cards"
							data-testid="auto-reveal-cards-field-container"
							description="Let the system automatically turn over the cards after everyone has voted."
							{...field}
							value={String(field.value)}
						/>
					)}
				/>
			</div>
			<p
				className="flex flex-row items-center gap-1 text-sm text-neutral-700"
				data-testid="advanced-settings-step-description"
			>
				<InfoIcon /> You can change all settings during the game
			</p>
		</div>
	);
}
