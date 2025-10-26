"use client";

import { VotingSystemsProvider } from "@/_src/entities/voting-system";
import { VotingSystem } from "@/_src/shared/api/voting-system-api";
import { CreateGameForm } from "./create-game-form";
import { MobileBlockerScreen } from "@/_src/shared/ui/components/mobile-blocker-screen";
import { Streamable } from "@/_src/shared/lib";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface Props {
	votingSystems: Streamable<VotingSystem[]>;
}

export const CreateGamePage = ({ votingSystems }: Props) => {
	console.log("re-render");

	return (
		<NuqsAdapter>
			<MobileBlockerScreen>
				<VotingSystemsProvider value={votingSystems}>
					<div className="h-screen flex-1">
						<CreateGameForm />
					</div>
				</VotingSystemsProvider>
			</MobileBlockerScreen>
		</NuqsAdapter>
	);
};
