# TESTING RULES FOR GAME-ROOM PAGE COMPONENTS

## Rules the AI must follow

-   Use @/test/utilities import instead of React Testing Library
-   Use helper function for entities generation from **tests**/game-state-store.test-helpers
-   Define a separate function renderComponent/renderHook where it's needed to set wrapper GameRoomFakeProviderWrapper and provide all the necessary mock dependencies
-   Take the "user" (UserEvent) from returned object of render utility function and use it for interaction with components

## Patterns

### Good

import { test, describe, expect, vi } from "vitest";
import { act, render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import {
generateGame,
generateParticipant,
generateTicket,
} from "../**tests**/game-state-store.test-helpers";
import { GameRoomFakeProviderWrapper } from "../**mocks**";

# Example of tests

describe("TestComponent", () => {
test("renders succsesfully", async () => {
const { unmount } = renderComponent(); # the test body

    	# assertions
    });

    # create such a test for components
    test("doesn't violate any accessiblity rules", async () => {
    	const { container } = renderComponent();
    	const results = await axe(container);
    	expect(results).toHaveNoViolations();
    });

});

# Example of the mocks creation

const createTicket = vi.fn(
async (gameId: string, data: CreateTicketForGameRequest) => {
return generateTicket({ ...data });
},
);

# Example of renderComponent function

function renderComponent() {
return render(<TicketsPanel />, { # Example of using GameRoomFakeProviderWrapper
wrapper: GameRoomFakeProviderWrapper({
apiProps: {
game: { ticket: { createTicket } },
},
gameStateProps: { # Example of using helper functions for entity generation
game: generateGame({
id: "test-game-id",
tickets: [
generateTicket({
id: "ticket-id-1",
title: "Ticket Name",
}),
],
}),
currentParticipant: generateParticipant({
role: ParticipantRole.Master,
}),
},
}),
});
}
