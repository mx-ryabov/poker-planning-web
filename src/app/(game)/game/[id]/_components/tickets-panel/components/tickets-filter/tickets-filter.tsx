import { Button } from "@/src/shared/ui/components/button";
import { FilterIcon } from "@/src/shared/ui/components/icon";

export function TicketsFilter() {
	return (
		<Button
			variant="outline"
			shape="square"
			size="small"
			className="border-neutral-300"
		>
			<FilterIcon size={16} thikness="regular" />
		</Button>
	);
}
