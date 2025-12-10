"use client";
import { NewButton } from "@/_src/shared/ui/components/button";
import { List } from "@/_src/shared/ui/components/list";
import { Popover } from "@/_src/shared/ui/components/popover";
import { HTMLAttributes, useCallback, useRef, useState } from "react";
import { FlashWithLinesIcon } from "@/_src/shared/ui/components/icon/svg/flash-with-lines.icon";
import { Highlighter } from "@/_src/shared/ui/components/highlighter";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { ErrorBoundary } from "@/_src/shared/ui/components/error-boundary";
import { Tooltip } from "@/_src/shared/ui/components/tooltip";
import { useConfirmationModal } from "@/_src/shared/providers";
import { useOnboardingOptions } from "./use-onboarding-options";

type Props = HTMLAttributes<HTMLDivElement>;

export function OnboardingHelper(props: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { isVisible, dismiss } = useVisibilityState();
	const options = useOnboardingOptions();

	if (!isVisible || options.length === 0) return null;

	return (
		<div {...props}>
			<ErrorBoundary>
				<div ref={containerRef}>
					<Popover>
						<Highlighter id="quick-guide">
							<NewButton>
								<FlashWithLinesIcon size={18} /> Quick Guide
							</NewButton>
						</Highlighter>
						<Popover.Content
							triggerRef={containerRef}
							placement="top start"
							className="px-4 pt-3 pb-1"
						>
							{({ close }) => (
								<>
									<div className="flex flex-row items-center justify-between">
										<h1
											className="font-bold text-sm text-neutral-900 px-1"
											slot="title"
										>
											Onboarding List
										</h1>
										<Tooltip>
											<NewButton
												shape="square"
												size="small"
												variant="ghost"
												slot="close"
												className="-mr-2"
												onPress={dismiss}
											>
												<CloseIcon size={20} />
											</NewButton>
											<Tooltip.Content>
												Dismiss
											</Tooltip.Content>
										</Tooltip>
									</div>
									<List
										className="*:hover:bg-neutral-200 -mx-3"
										aria-label="Onboarding List"
									>
										{options.map((option) => (
											<OnboardingListItem
												key={option.type}
												title={option.title}
												subTitle={option.subTitle}
												emoji={option.emoji}
												onAction={() => {
													option.start();
													close();
												}}
											/>
										))}
									</List>
								</>
							)}
						</Popover.Content>
					</Popover>
				</div>
			</ErrorBoundary>
		</div>
	);
}

const QUICK_GUIDE_VISIBILITY_STATE = "QUICK_GUIDE_VISIBILITY_STATE";
function useVisibilityState() {
	const [isVisible, setIsVisible] = useState(() => {
		if (typeof window === "undefined" || !localStorage) return false;

		const visibilityState = localStorage.getItem(
			QUICK_GUIDE_VISIBILITY_STATE,
		);

		return visibilityState !== "dismissed";
	});
	const { open } = useConfirmationModal();

	const dismiss = useCallback(() => {
		open({
			title: "Dismiss Quick Guide widget",
			contentMessage:
				"After dismissing the widget will disappear but it will be available in the user menu.",
			onConfirm: () => {
				localStorage.setItem(
					"QUICK_GUIDE_VISIBILITY_STATE",
					"dismissed",
				);
				setIsVisible(false);
			},
			confirmBtnText: "Dismiss",
		});
	}, [open]);

	return { isVisible, dismiss };
}

type OnboardingListItemProps = {
	emoji: string;
	title: string;
	subTitle: string;
	onAction: () => void;
};
function OnboardingListItem({
	emoji,
	title,
	subTitle,
	onAction,
}: OnboardingListItemProps) {
	return (
		<List.Item onAction={onAction} textValue={title}>
			<div className="flex flex-row gap-1 items-center pr-1">
				<span className="text-lg">{emoji}</span>
				<div className="flex flex-col">
					<span className="font-medium">{title}</span>
					<span className="text-xs">{subTitle}</span>
				</div>
			</div>
		</List.Item>
	);
}
