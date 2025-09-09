"use client";

import { VotingSystemsProvider } from "@/_src/entities/voting-system";
import { VotingSystem } from "@/_src/shared/api/voting-system-api";
import { CreateGameForm } from "./create-game-form";
import { MobileBlockerScreen } from "@/_src/shared/ui/components/mobile-blocker-screen";
import { Streamable } from "@/_src/shared/lib";

interface Props {
	votingSystems: Streamable<VotingSystem[]>;
}

export const CreateGamePage = ({ votingSystems }: Props) => {
	return (
		<MobileBlockerScreen>
			<div className="h-screen flex-1">
				<VotingSystemsProvider value={votingSystems}>
					<CreateGameForm />
				</VotingSystemsProvider>
			</div>
		</MobileBlockerScreen>
	);
};
