"use client";
import { ContentPosition } from "@/_src/shared/lib";
import { Button, Popover } from "@/_src/shared/ui";

export function MainPage() {
	return (
		<div className="flex w-1/3 h-screen pl-[500px] pt-[300px]">
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
