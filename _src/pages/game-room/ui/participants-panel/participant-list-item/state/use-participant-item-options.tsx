// import {
// 	checkPermissions,
// 	selectCurrentRole,
// 	useGameState,
// } from "@/_src/pages/game-room/model";
//import { UserRemoveIcon } from "@/_src/shared/ui/components/icon/svg/user-remove.icon";
import { useMemo } from "react";

export function useParticipantItemOptions() {
	// const currentRole = useGameState(selectCurrentRole);

	// const kickParticipant = useCallback(() => {
	// 	console.log("Kick: ", participantFromList.id);
	// }, [participantFromList.id]);

	const options = useMemo(() => {
		// const result = [];
		// if (
		// 	checkPermissions(
		// 		"KickParticipant",
		// 		currentRole,
		// 		participantFromList.role,
		// 	)
		// ) {
		// 	result.push({
		// 		title: "Kick",
		// 		icon: <UserRemoveIcon size={20} className="shrink-0" />,
		// 		action: kickParticipant,
		// 	});
		// }
		return [];
	}, []);

	return options;
}
