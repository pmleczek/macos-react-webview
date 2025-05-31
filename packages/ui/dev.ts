import * as esbuild from 'esbuild';

const context = await esbuild.context({
  entryPoints: ['index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  jsx: 'automatic',
  target: ['es6'],
  external: ['classnames', 'react', 'react-dom', 'react-router'],
  sourcemap: true,
  loader: {
    '.css': 'css',
    '.ttf': 'dataurl',
  },
  logLevel: 'info',
});

await context.watch();
