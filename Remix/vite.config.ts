import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    remix({
      basename: '/',
      buildDirectory: 'build',
      future: {
        /* any enabled future flags */
      },
      ignoredRouteFiles: ['**/*.css'],
      /*
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/somewhere/cool/*', 'catchall.tsx');
        });
      },
      */
      serverBuildFile: 'index.js',
    }),
  ],
});
