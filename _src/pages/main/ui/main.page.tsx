"use client";
import { ContentPosition } from "@/_src/shared/lib";
import { Button, Popover } from "@/_src/shared/ui";

export function MainPage() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Popover position={ContentPosition.RightStart}>
				<Popover.Trigger>
					<Button title={"Click!"} />
				</Popover.Trigger>
				<Popover.Content>
					<div className="flex p-2 bg-white border border-neutral-100 rounded-lg drop-shadow-lg">
						Content! Lalalala <br />
						tyryntyryn lalalalala
					</div>
				</Popover.Content>
			</Popover>
		</div>
	);
}
