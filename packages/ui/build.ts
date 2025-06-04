import * as esbuild from 'esbuild';

await esbuild.build({
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
    '.ttf': 'file',
  },
  logLevel: 'info',
  minify: true,
});
