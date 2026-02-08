import { Button } from "@/src/shared/ui/components/button";
import { Highlighter } from "@/src/shared/ui/components/highlighter";
import { PeopleIcon } from "@/src/shared/ui/components/icon";
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
				<Button>Click Me!</Button>
			</Highlighter>
			<Highlighter id="unique-button-2">
				<Button variant="ghost" shape="square">
					<PeopleIcon />
				</Button>
			</Highlighter>
			<Highlighter id="unique-button-3">
				<Button variant="grayed-out" shape="square">
					<PeopleIcon />
				</Button>
			</Highlighter>
			<Highlighter id="unique-button-4">
				<Button variant="outline">
					<PeopleIcon /> Click me!
				</Button>
			</Highlighter>
		</div>
	);
};
