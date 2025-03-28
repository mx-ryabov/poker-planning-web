import { expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { toHaveNoViolations } from "jest-axe";

expect.extend(matchers);
expect.extend(toHaveNoViolations);
vi.mock("zustand");
