import { defineConfig } from 'vite';

// GitHub Pages serves this project from https://<user>.github.io/minigames/,
// so every built asset and route needs that prefix.
export default defineConfig({
  base: '/minigames/',
});
