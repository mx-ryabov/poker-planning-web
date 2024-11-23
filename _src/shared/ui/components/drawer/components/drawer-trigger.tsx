import { DialogTrigger, DialogTriggerProps } from "react-aria-components";

type TriggerProps = DialogTriggerProps;

export function DrawerTrigger(props: TriggerProps) {
	const { children, ...restProps } = props;

	return <DialogTrigger {...restProps}>{children}</DialogTrigger>;
}
