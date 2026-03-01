import { expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@/__mocks__/intersection-observer";
import "@/__mocks__/resize-observer";
import { toHaveNoViolations } from "jest-axe";

expect.extend(matchers);
expect.extend(toHaveNoViolations);
vi.mock("zustand");
