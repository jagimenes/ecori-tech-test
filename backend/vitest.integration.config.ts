import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./tests/integration/**/*.{test,spec}.ts"],
    setupFiles: "./tests/integration/vitest.integration.setup.ts",
  },
});
