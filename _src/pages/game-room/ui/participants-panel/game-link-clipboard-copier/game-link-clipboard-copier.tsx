import { Button } from "@/_src/shared/ui/components/button";
import { CopyIcon, CopySuccessIcon } from "@/_src/shared/ui/components/icon";
import { Input } from "@/_src/shared/ui/components/input";
import { Tooltip } from "@/_src/shared/ui/components/tooltip";
import { cva } from "class-variance-authority";
import { useState } from "react";

const copyBtnStyles = cva("shrink-0 transition-colors", {
	variants: {
		isCopied: {
			true: ["text-success-500 border border-success-500"],
			false: [],
		},
	},
});

export function GameLinkClipboardCopier() {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = () => {
		window.navigator.clipboard.writeText(window.location.href);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 5000);
	};

	return (
		<div className="flex flex-row gap-2 items-end">
			<Input
				label="Share the game link"
				isDisabled
				value={window.location.href}
			/>
			<Tooltip isOpen={isCopied}>
				<Button
					shape="square"
					variant="ghost"
					className={copyBtnStyles({ isCopied })}
					onPress={copyToClipboard}
				>
					{isCopied ? (
						<CopySuccessIcon size={18} />
					) : (
						<CopyIcon size={18} />
					)}
				</Button>
				<Tooltip.Content>Copied 🎉</Tooltip.Content>
			</Tooltip>
		</div>
	);
}
