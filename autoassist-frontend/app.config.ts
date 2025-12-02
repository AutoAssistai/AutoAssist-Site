import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'cloudflare-pages',
    rollupConfig: {
      external: [],
    },
  },
  vite: {
    resolve: {
      alias: {
        '~': '/src',
      },
    },
  },
});
