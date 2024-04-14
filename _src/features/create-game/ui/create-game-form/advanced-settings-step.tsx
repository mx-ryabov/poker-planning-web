import { useFormContext } from "react-hook-form";

export default function AdvancedSettingsStep() {
	const { register } = useFormContext();
	return (
		<div className="w-full h-full flex shrink-0 basis-full justify-center pl-[60px] flex-col">
			<p className="mb-[20px] text-base">Advanced settings</p>
			<div>
				<input
					type="checkbox"
					id="isAutoReveal"
					className="cursor-pointer"
					{...register("isAutoRevealCards")}
				/>
				<label htmlFor="isAutoReveal" className="cursor-pointer">
					Auto-reveal cards
				</label>
			</div>
		</div>
	);
}
