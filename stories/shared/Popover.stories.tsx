import { ContentPosition } from "@/_src/shared/lib";
import { Button, ButtonSquare, CloseIcon, Popover } from "@/_src/shared/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Shared/Popover",
	component: Popover,
	parameters: {
		//layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const PopoverDefault: Story = {
	render: (args) => (
		<div className="grid grid-cols-3 gap-8 w-96">
			{PopoverVariants.map((variant, ind) => (
				<div key={ind}>
					<Popover position={variant.position} showingMode="click">
						<Popover.Trigger>
							<Button title={variant.title} />
						</Popover.Trigger>
						<Popover.Content>
							<div className="flex flex-row gap-2 items-center p-2 bg-white border border-neutral-100 rounded-lg drop-shadow-lg">
								{variant.title} content!
								<Popover.Close>
									<ButtonSquare
										size="small"
										icon={CloseIcon}
									/>
								</Popover.Close>
							</div>
						</Popover.Content>
					</Popover>
				</div>
			))}
		</div>
	),
};

const PopoverVariants = [
	{ title: "LeftStart", position: ContentPosition.LeftStart },
	{ title: "Left", position: ContentPosition.Left },
	{ title: "LeftEnd", position: ContentPosition.LeftEnd },
	{ title: "TopStart", position: ContentPosition.TopStart },
	{ title: "Top", position: ContentPosition.Top },
	{ title: "TopEnd", position: ContentPosition.TopEnd },
	{ title: "RightStart", position: ContentPosition.RightStart },
	{ title: "Right", position: ContentPosition.Right },
	{ title: "RightEnd", position: ContentPosition.RightEnd },
	{ title: "BottomStart", position: ContentPosition.BottomStart },
	{ title: "Bottom", position: ContentPosition.Bottom },
	{ title: "BottomEnd", position: ContentPosition.BottomEnd },
];
