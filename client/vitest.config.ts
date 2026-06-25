import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    // Single-run by default; CI mode disables watch. `vitest run` is wired via the npm script.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Playwright e2e specs live under e2e/ and must not be picked up by Vitest.
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
