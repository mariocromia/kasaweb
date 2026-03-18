import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

const expressPlugin = {
  name: 'express-plugin',
  configureServer(server) {
    server.middlewares.use('/api', async (req, res, next) => {
      try {
        const { default: apiApp } = await server.ssrLoadModule('./src/server/api.ts');
        apiApp(req, res, next);
      } catch (err) {
        console.error('Error loading Express API:', err);
        next(err);
      }
    });
  }
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), expressPlugin],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: ['**/analytics.json', '**/analytics.db', '**/node_modules/**'],
      },
    },
  };
});
