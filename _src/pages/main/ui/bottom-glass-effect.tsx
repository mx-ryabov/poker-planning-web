export function BottomGlassEffect() {
	return (
		<div className="pointer-events-none fixed right-0 bottom-0 left-0 z-10 h-[100px] w-full">
			<div className="absolute inset-0 overflow-hidden">
				{Array.from(new Array(8)).map((_, ind) => (
					<div
						className="pointer-events-none absolute inset-0 opacity-100 will-change-auto"
						style={{
							zIndex: ind + 1,
							backdropFilter: `blur(${7 / Math.pow(2, 6 - ind)}px)`,
							maskImage: calcMaskImage(ind),
						}}
						key={ind}
					></div>
				))}
			</div>
		</div>
	);
}

function calcMaskImage(ind: number) {
	if (ind === 6) {
		return `linear-gradient(rgba(0, 0, 0, 0) ${ind * 12.5}%, rgb(0, 0, 0) ${(ind + 1) * 12.5}%, rgb(0, 0, 0) ${(ind + 2) * 12.5}%`;
	}
	if (ind === 7) {
		return `linear-gradient(rgba(0, 0, 0, 0) ${ind * 12.5}%, rgb(0, 0, 0) ${(ind + 1) * 12.5}%`;
	}
	return `linear-gradient(rgba(0, 0, 0, 0) ${ind * 12.5}%, rgb(0, 0, 0) ${(ind + 1) * 12.5}%, rgb(0, 0, 0) ${(ind + 2) * 12.5}%, rgb(0, 0, 0, 0) ${(ind + 3) * 12.5}%)`;
}
