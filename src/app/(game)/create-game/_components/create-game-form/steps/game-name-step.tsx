import { FullSizeFormTextInput } from "@/src/shared/ui/components/full-size-form-text-field";

type Props = {
	nameValue: string;
	onNameChange: (newName: string) => void;
	onEnterPress: () => void;
	nameError?: string;
};

export function GameNameStep(props: Props) {
	const { nameValue, onNameChange, onEnterPress, nameError } = props;
	return (
		<FullSizeFormTextInput
			label="Hey!👋 What is the name of your game?"
			placeholder="Team Planning"
			maxLength={50}
			value={nameValue}
			onChange={(e) => onNameChange(e.target.value)}
			onEnter={onEnterPress}
			name="name"
			error={nameError}
			autoFocus
			shouldShowErrorAfterTouch
		/>
	);
}
