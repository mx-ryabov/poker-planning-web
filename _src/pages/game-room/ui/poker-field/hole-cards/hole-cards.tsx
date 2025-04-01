"use client";
import { ListBox, ListBoxItem } from "react-aria-components";
import { EstimationCard } from "./components/estimation-card";
import { useHoleCardsState } from "./state/use-hole-cards-state";

export function HoleCards() {
	const { selectedCard, cards, onSelectionChange } = useHoleCardsState();

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-sm text-neutral-500">
				{selectedCard.size === 0
					? "How long would it take you to complete this task?👇"
					: "You’re done! Let’s wait for the others🤏"}
			</p>
			<ListBox
				className="flex flex-row gap-2"
				aria-label="Estimation Cards"
				selectionMode="single"
				items={cards}
				selectedKeys={selectedCard}
				onSelectionChange={onSelectionChange}
				orientation="horizontal"
			>
				{(card) => (
					<ListBoxItem
						key={card.id}
						id={card.id}
						textValue={card.value}
						className="outline-0"
						aria-label={`Estimation Card with value = ${card.value}`}
					>
						{(renderProps) => (
							<EstimationCard
								rank={card.value}
								suit={card.suit}
								isSelected={renderProps.isSelected}
								isHovered={renderProps.isHovered}
								isFocusVisible={renderProps.isFocusVisible}
							/>
						)}
					</ListBoxItem>
				)}
			</ListBox>
		</div>
	);
}
