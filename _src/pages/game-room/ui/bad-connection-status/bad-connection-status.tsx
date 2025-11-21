"use client";
import { useExitAnimation } from "@/_src/shared/lib";
import { useGameManagementState } from "../../model";
import { useRef } from "react";

export function BadConnectionStatus() {
	const containerRef = useRef(null);
	const liveStatus = useGameManagementState((s) => s.liveStatus);
	const { status } = liveStatus;

	const isScreenActive = status !== "connected";
	const isAnimationExiting = useExitAnimation(containerRef, isScreenActive);

	if (status === "connected" && !isAnimationExiting) return null;

	const renderContent = () => {
		if (status === "notStarted") {
			return (
				<p className="text-white text-4xl">
					Your game is going to start soon!
				</p>
			);
		}
		if (status === "connecting") {
			return <p className="text-white text-4xl">Joining...</p>;
		}

		if (status === "reconnecting") {
			return (
				<p className="text-white text-4xl">
					Don&apos;t worry!
					<br />
					We&apos;ll have you back soon.
				</p>
			);
		}

		if (status === "disconnected") {
			return (
				<p className="text-white text-4xl">
					You were disconnected.
					<br />
					Trying to reconnect...
				</p>
			);
		}

		if (status === "failed") {
			return (
				<p className="text-white text-4xl">
					Something went wrong...
					<br />
					Try to reload the page.
				</p>
			);
		}

		return null;
	};

	return (
		<div
			ref={containerRef}
			data-animation-exiting={isAnimationExiting}
			className="data-[animation-exiting=true]:animate-fade-in-reverse flex justify-center items-center font-bold h-screen w-full flex-col overflow-hidden z-50 bg-neutral-900/40 absolute inset-0 backdrop-blur-sm"
		>
			{renderContent()}
		</div>
	);
}
