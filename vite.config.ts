import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [reactRefresh()],
  envPrefix: 'REACT_APP_',
});
