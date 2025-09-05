# TESTING RULES FOR GAME-ROOM PAGE COMPONENTS

## Rules the AI must follow

-   Use @/test/utilities import instead of React Testing Library
-   Use user (UserEvent) from render function (from @/test/utilities) for an interaction with components
-   Create a accessibility test as in the example below

## Patterns

### Example of imports

import { test, describe, expect, vi } from "vitest";
import { act, render, within } from "@/test/utilities";
import { axe } from "jest-axe";

### Example of tests

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
