import { buildProvider } from "@/_src/shared/lib";
import { GameEventListener } from "../state";

const [useGameEvents, GameEventsProvider] = buildProvider<GameEventListener>();

export { useGameEvents, GameEventsProvider };
