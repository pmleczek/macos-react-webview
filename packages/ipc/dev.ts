import * as esbuild from 'esbuild';

const context = await esbuild.context({
  entryPoints: ['index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: ['es6'],
  sourcemap: true,
  logLevel: 'info',
});

await context.watch();
