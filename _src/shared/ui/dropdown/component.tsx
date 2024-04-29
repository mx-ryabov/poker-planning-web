export function Dropdown() {
	return <div></div>;
}

type DropdownTriggerProps = {
	//children: React.ReactNode;
};

export function DropdownTrigger(props: DropdownTriggerProps) {
	return (
		<div onClick={() => console.log(1)}>
			<button onClick={() => console.log(2)}>Test</button>
		</div>
	);
}

export function DropdownMenu() {}
