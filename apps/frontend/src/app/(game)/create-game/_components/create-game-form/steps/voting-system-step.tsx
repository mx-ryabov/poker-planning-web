import { KeyboardEvent } from "react";
import { useVotingSystems } from "@/src/domain/entities/voting-system";
import { InfoIcon } from "@/src/shared/ui/components/icon";
import {
	RadioGroup,
	RadioGroupSkeleton,
} from "@/src/shared/ui/components/radio-group";
import { Stream } from "@/src/shared/ui/next-components/stream";

type Props = {
	votingSystemId: string;
	onVotingSystemIdChange: (id: string) => void;
	goNextStep: () => void;
};

export function VotingSystemStep(props: Props) {
	const { votingSystemId, onVotingSystemIdChange, goNextStep } = props;
	const votingSystemsStream = useVotingSystems();

	const onVotingSystemRadioKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			goNextStep();
		}
	};

	return (
		<RadioGroup
			variant="content-inside"
			size="large"
			name="votingSystemId"
			defaultValue={votingSystemId}
			onChange={(value) => onVotingSystemIdChange(value)}
		>
			<RadioGroup.Label
				className="label"
				data-testid="voting-systems-field-label"
			>
				Now choose your voting system
			</RadioGroup.Label>
			<Stream
				value={votingSystemsStream}
				fallback={
					<RadioGroupSkeleton
						count={2}
						size="large"
						variant="content-inside"
					/>
				}
			>
				{(votingSystems) =>
					votingSystems.map((vs, ind) => (
						<RadioGroup.Radio
							key={vs.id}
							value={vs.id}
							autoFocus={ind === 0}
							data-testid="voting-system-option-container"
							onKeyDown={onVotingSystemRadioKeyDown}
						>
							{vs.name} (
							{vs.votes.map((vote) => `${vote.value}`).join(", ")}
							)
						</RadioGroup.Radio>
					))
				}
			</Stream>
			<RadioGroup.Description data-testid="voting-systems-field-description">
				<InfoIcon /> You can change all settings during the game
			</RadioGroup.Description>
		</RadioGroup>
	);
}
