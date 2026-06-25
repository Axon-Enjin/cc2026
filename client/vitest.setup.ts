import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

// Register the jest-axe `toHaveNoViolations` matcher for accessibility assertions.
expect.extend(toHaveNoViolations);

// Ensure the DOM is reset between tests so render state does not leak.
afterEach(() => {
  cleanup();
});
