import { NewButton } from "@/_src/shared/ui/components/button";
import { Highlighter } from "@/_src/shared/ui/components/highlighter";
import { PeopleIcon } from "@/_src/shared/ui/components/icon";
import type { Meta } from "@storybook/nextjs";

const meta = {
	title: "Shared/Highlighter",
	component: Highlighter,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Highlighter>;

export default meta;

export const HighlighterWithButton = () => {
	return (
		<div className="flex flex-row gap-8">
			<Highlighter id="unique-button-1">
				<NewButton>Click Me!</NewButton>
			</Highlighter>
			<Highlighter id="unique-button-2">
				<NewButton variant="ghost" shape="square">
					<PeopleIcon />
				</NewButton>
			</Highlighter>
			<Highlighter id="unique-button-3">
				<NewButton variant="grayed-out" shape="square">
					<PeopleIcon />
				</NewButton>
			</Highlighter>
			<Highlighter id="unique-button-4">
				<NewButton variant="outline">
					<PeopleIcon /> Click me!
				</NewButton>
			</Highlighter>
		</div>
	);
};
