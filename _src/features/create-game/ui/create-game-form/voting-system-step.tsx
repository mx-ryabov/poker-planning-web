import { useFormContext, useWatch } from "react-hook-form";
import { CreateGameFormFormState } from "./form";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useVotingSystems } from "@/_src/entities/voting-system/model/voting-systems-provider";

gsap.registerPlugin(useGSAP);

export default function VotingSystemStep() {
	const votingSystems = useVotingSystems();
	const { register } = useFormContext<CreateGameFormFormState>();
	const currentVotingSystemId = useWatch({ name: "votingSystemId" });
	const container = useRef(null);

	useGSAP(
		() => {
			gsap.from(".label", { opacity: 0, y: 10, duration: 0.3 });
		},
		{ scope: container },
	);
	console.log(currentVotingSystemId);

	return (
		<div
			ref={container}
			className="w-full h-full flex shrink-0 basis-full justify-center pl-[60px] flex-col"
		>
			<p className="label mb-[20px] text-base">
				Now choose your voting system
			</p>
			<div className="label flex flex-col">
				{votingSystems.map((vs, ind) => (
					<label
						key={ind}
						className={`border rounded cursor-pointer px-[8px] py-[4px] mb-[8px] max-w-fit ${
							currentVotingSystemId === vs.id
								? styles.active
								: styles.inactive
						}`}
						htmlFor={`votingSystemId-${ind}`}
					>
						<input
							type="radio"
							value={vs.id}
							className="hidden"
							id={`votingSystemId-${ind}`}
							{...register("votingSystemId", {
								required: true,
							})}
						/>
						<span className="text-sm">{vs.name}</span>
						<span className="text-sm">
							{vs.votes.map((vote) => `${vote.value}`).join(", ")}
						</span>
					</label>
				))}
			</div>
		</div>
	);
}

const styles = {
	inactive: "hover:bg-slate-200",
	active: "bg-primary-500 text-white border-primary-500",
};
