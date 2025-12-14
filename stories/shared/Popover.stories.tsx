import { Button, ButtonSquare } from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { Popover } from "@/_src/shared/ui/components/popover";
import type { Meta } from "@storybook/nextjs";
import { Placement } from "react-aria";

const meta = {
	title: "Shared/Popover",
	component: Popover.Content,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Popover.Content>;

export default meta;

export const PopoverDefault = () => (
	<Popover>
		<Button title="Click!" />
		<Popover.Content placement={"bottom left"}>
			<div className="flex flex-row gap-2 items-center p-2 ">
				Content!
				<ButtonSquare size="small" icon={CloseIcon} slot="close" />
			</div>
		</Popover.Content>
	</Popover>
);

export const PopoverList = () => (
	<div className="grid grid-cols-3 gap-8 w-96">
		{PopoverVariants.map((variant, ind) => (
			<div key={ind}>
				<Popover>
					<Button title={variant.title} />
					<Popover.Content placement={variant.placement}>
						<div className="flex flex-row gap-2 items-center p-2 bg-white border border-neutral-100 rounded-lg drop-shadow-lg">
							{variant.title} content!
							<ButtonSquare
								size="small"
								icon={CloseIcon}
								slot="close"
							/>
						</div>
					</Popover.Content>
				</Popover>
			</div>
		))}
	</div>
);

const PopoverVariants: { title: string; placement: Placement }[] = [
	{ title: "LeftStart", placement: "left top" },
	{ title: "Left", placement: "left" },
	{ title: "LeftEnd", placement: "left bottom" },
	{ title: "TopStart", placement: "top left" },
	{ title: "Top", placement: "top" },
	{ title: "TopEnd", placement: "top right" },
	{ title: "RightStart", placement: "right top" },
	{ title: "Right", placement: "right" },
	{ title: "RightEnd", placement: "right bottom" },
	{ title: "BottomStart", placement: "bottom left" },
	{ title: "Bottom", placement: "bottom" },
	{ title: "BottomEnd", placement: "bottom right" },
];
