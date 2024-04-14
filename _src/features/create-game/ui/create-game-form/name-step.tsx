import { useFormContext } from "react-hook-form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function NameStep() {
	const { register } = useFormContext();
	const container = useRef(null);

	useGSAP(
		() => {
			gsap.from(".label", { opacity: 0, y: 10, duration: 0.3 });
		},
		{ scope: container },
	);

	return (
		<div
			ref={container}
			className=" w-full h-full flex flex-col shrink-0 basis-full justify-center pl-[60px]"
		>
			<h3 className="label mb-[20px]">
				Hey!👋 What is name of your game?
			</h3>
			<input
				className="input w-[400px]"
				type="text"
				{...register("name", { required: true })}
			/>
		</div>
	);
}
