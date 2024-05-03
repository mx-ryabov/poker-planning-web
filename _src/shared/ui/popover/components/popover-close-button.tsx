import { usePopoverDispatch } from "../providers/internal-popover-provider";

type PopoverCloseButtonProps = {
	children: JSX.Element;
};

const PopoverCloseButton = ({ children }: PopoverCloseButtonProps) => {
	const { open } = usePopoverDispatch();

	return (
		<div className="w-fit" onClick={() => open(false)}>
			{children}
		</div>
	);
};

export default PopoverCloseButton;
