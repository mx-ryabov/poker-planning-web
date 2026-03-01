import { InfoIcon } from "@/src/shared/ui/components/icon";
import { Switch } from "@/src/shared/ui/components/switch";

type Props = {
	isAutoRevealCards: boolean;
	onIsAutoRevealCardsChange: (isSelected: boolean) => void;
};

export function AdvancedSettingsStep(props: Props) {
	const { isAutoRevealCards, onIsAutoRevealCardsChange } = props;
	return (
		<>
			<p className="label mb-4 text-lg text-neutral-900">
				Advanced settings
			</p>
			<div
				className="mb-6 flex flex-col"
				data-testid="advanced-settings-fields-container"
			>
				<Switch
					label="Auto-reveal cards"
					name="isAutoRevealCards"
					autoFocus
					data-testid="auto-reveal-cards-field-container"
					description="Let the system automatically turn over the cards after everyone has voted."
					isSelected={isAutoRevealCards}
					onChange={(isSelected) =>
						onIsAutoRevealCardsChange(isSelected)
					}
				/>
			</div>
			<p
				className="flex flex-row items-center gap-1 text-sm text-neutral-700"
				data-testid="advanced-settings-step-description"
			>
				<InfoIcon /> You can change all settings during the game
			</p>
		</>
	);
}
