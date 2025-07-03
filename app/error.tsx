"use client";
import { Button } from "@/_src/shared/ui/components/button";
import {
	ArrowLeftIcon,
	RefreshBorderlessIcon,
} from "@/_src/shared/ui/components/icon";
import { useRouter } from "next/navigation";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	const devInfo =
		process.env.NODE_ENV === "development" ? error.message : null;

	return (
		<div className="flex h-dvh w-full flex-col items-center justify-center gap-8">
			<div className="flex flex-col items-center">
				<h1 className="mb-2 text-center text-5xl leading-normal font-bold text-neutral-900">
					Oops!
				</h1>
				<p className="text-center text-base text-neutral-900">
					Something went wrong...
					<br />
					<span className="italic">{devInfo}</span>
				</p>
				😔👉👈
			</div>
			<div className="flex flex-row gap-2">
				<Button
					title="Go Back"
					variant="ghost"
					contentLeft={ArrowLeftIcon({ size: 18 })}
					onPress={() => router.back()}
				/>
				<Button
					title="Try Again"
					variant="outline"
					contentLeft={RefreshBorderlessIcon({ size: 18 })}
					onPress={reset}
				/>
			</div>
		</div>
	);
}
