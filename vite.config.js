import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  reload: false,
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
