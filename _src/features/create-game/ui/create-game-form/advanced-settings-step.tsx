import { InfoIcon } from "@/_src/shared/ui/components/icon";
import { Switch } from "@/_src/shared/ui/components/switch";
import { Controller, useFormContext } from "react-hook-form";
import { CreateGameFormFormState } from "./form";

export default function AdvancedSettingsStep() {
	const { control } = useFormContext<CreateGameFormFormState>();
	return (
		<div className="w-full h-full flex shrink-0 basis-full justify-center pl-[60px] flex-col">
			<p className="label mb-4 text-lg text-neutral-900">
				Advanced settings
			</p>
			<div className="flex flex-col mb-6">
				<Controller
					control={control}
					name="isAutoRevealCards"
					render={({ field }) => (
						<Switch
							label="Auto-reveal cards"
							description="Let the system automatically turn over the cards after everyone has voted."
							{...field}
							value={String(field.value)}
						/>
					)}
				/>
			</div>
			<p className="flex flex-row items-center gap-1 text-sm text-neutral-300">
				<InfoIcon /> You can change all settings during the game
			</p>
		</div>
	);
}
