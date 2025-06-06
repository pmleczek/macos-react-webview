import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: ['es6'],
  sourcemap: true,
  logLevel: 'info',
});
