import * as esbuild from 'esbuild';

const context = await esbuild.context({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: ['es6'],
  external: ['ipc', 'react', 'react-dom'],
  sourcemap: true,
  logLevel: 'info',
});

await context.watch();
