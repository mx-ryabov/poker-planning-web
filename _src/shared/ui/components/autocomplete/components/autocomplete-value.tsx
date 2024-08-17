import { useMemo } from "react";
import { Input } from "../../input";
import { ButtonContext, Provider } from "react-aria-components";
import { useAutocompleteValue } from "../hooks/use-autocomplete-value";
import { ButtonSquare } from "../../button";
import { ArrowDownIcon } from "../../icon";

export function AutocompleteValue() {
	const { inputProps, overlayTriggerState, toggleBtnProps } =
		useAutocompleteValue();

	const toggleListButton = useMemo(() => {
		return (
			<Provider
				values={[
					[ButtonContext, { isPressed: overlayTriggerState.isOpen }],
				]}
			>
				<ButtonSquare
					icon={ArrowDownIcon}
					size="small"
					styleType="ghost"
					className="outline-none"
					aria-labelledby="autocomplete-toggle-button"
					excludeFromTabOrder={true}
					{...toggleBtnProps}
				/>
			</Provider>
		);
	}, [overlayTriggerState.toggle, overlayTriggerState.isOpen]);

	return <Input {...inputProps} endContent={toggleListButton} />;
}
