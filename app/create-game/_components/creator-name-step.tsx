import { useFormContext } from "react-hook-form";

export default function CreatorNameStep() {
	const { register } = useFormContext();

	return (
		<div className="w-full h-full flex flex-col shrink-0 basis-full justify-center pl-[60px]">
			<h3 className="mb-[20px]">Let&apos;s get acquainted👇</h3>
			<input
				className="w-[400px]"
				type="text"
				{...register("creatorName", { required: true })}
			/>
		</div>
	);
}
