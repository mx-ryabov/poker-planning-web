import { FullSizeFormTextInput } from "@/_src/shared/ui/components/full-size-form-text-field";

type Props = {
	creatorName: string;
	errorCreatorName?: string;
	onCreatorNameChange: (newName: string) => void;
	onCreatorNameEnter: () => void;
};

export function PersonalInfoStep(props: Props) {
	const {
		creatorName,
		errorCreatorName,
		onCreatorNameChange,
		onCreatorNameEnter,
	} = props;

	return (
		<FullSizeFormTextInput
			label="Let's get acquainted👇"
			placeholder="Type your name"
			maxLength={50}
			name="creatorName"
			value={creatorName}
			autoFocus
			onChange={(e) => onCreatorNameChange(e.target.value)}
			error={errorCreatorName}
			shouldShowErrorAfterTouch
			onEnter={onCreatorNameEnter}
		/>
	);
}
