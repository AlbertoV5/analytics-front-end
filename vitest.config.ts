import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ["tests/unit/*"],
    exclude: ["tests/e2e/*"],
  },
})