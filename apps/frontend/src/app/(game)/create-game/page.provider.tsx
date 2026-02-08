"use client";
import { VotingSystemsProvider } from "@/src/domain/entities/voting-system";
import { VotingSystem } from "@/src/domain/entities/voting-system";
import { Streamable } from "@/src/shared/lib";
import { MobileBlockerScreen } from "@/src/shared/ui/components/mobile-blocker-screen";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface Props {
	votingSystems: Streamable<VotingSystem[]>;
	children: React.ReactNode;
}

export function CreateGamePageProvider({ votingSystems, children }: Props) {
	return (
		<NuqsAdapter>
			<MobileBlockerScreen>
				<VotingSystemsProvider value={votingSystems}>
					{children}
				</VotingSystemsProvider>
			</MobileBlockerScreen>
		</NuqsAdapter>
	);
}
