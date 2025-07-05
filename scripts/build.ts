import { readableStreamToText, sleep } from 'bun';
import chalk from 'chalk';

let BUILD_TYPE = process.env.BUILD_TYPE;
if (
  BUILD_TYPE === undefined ||
  (BUILD_TYPE !== 'Debug' && BUILD_TYPE !== 'Release')
) {
  BUILD_TYPE = 'Debug';
}

const SCHEME_NAME = 'WebViewHost';
const BUILD_DIR = './build';

let JS_DEV_PROC: Bun.Subprocess | null = null;

const INFO_ICON = chalk.bold.cyan('i');
const CHECK_ICON = chalk.bold.green('✓');
const CROSS_ICON = chalk.bold.red('x');

const buildNative = async () => {
  console.log(
    INFO_ICON +
      ' Cleaning up build directory at ' +
      chalk.blueBright('macos/WebViewHost' + BUILD_DIR.replace('.', '')),
  );

  let subprocess = Bun.spawn(
    ['rm', '-rf', 'macos/WebViewHost' + BUILD_DIR.replace('.', '')],
    {
      stderr: 'pipe',
      stdout: 'pipe',
    },
  );
  let exitCode = await subprocess.exited;

  if (exitCode === 0) {
    console.log(
      CHECK_ICON +
        ' Succesfully cleaned up build directory at ' +
        chalk.blueBright('macos/WebViewHost' + BUILD_DIR.replace('.', '')),
    );
  } else {
    console.write(await readableStreamToText(subprocess.stderr));
    console.log(
      CROSS_ICON +
        ' Cleaning up build directory at ' +
        chalk.blueBright('macos/WebViewHost' + BUILD_DIR.replace('.', '')) +
        ' failed with exit code ' +
        chalk.red(exitCode),
    );
    process.exit(exitCode);
  }

  console.log(
    INFO_ICON +
      ' Building target ' +
      chalk.blueBright(SCHEME_NAME) +
      ' with configuration ' +
      chalk.blueBright(BUILD_TYPE),
  );

  const start = Date.now();
  subprocess = Bun.spawn(
    [
      'xcodebuild',
      '-scheme',
      SCHEME_NAME,
      '-configuration',
      BUILD_TYPE,
      '-derivedDataPath',
      BUILD_DIR,
    ],
    {
      cwd: './macos/WebViewHost',
      stderr: 'pipe',
      stdout: 'pipe',
    },
  );

  exitCode = await subprocess.exited;

  const stop = Date.now();
  const secondsElapsed = (stop - start) / 1000;

  if (exitCode === 0) {
    console.log(
      CHECK_ICON +
        ' Build succeeded in ' +
        chalk.blueBright(`${secondsElapsed}s`),
    );
  } else {
    console.write(await readableStreamToText(subprocess.stderr));
    console.log(
      CROSS_ICON + ' Build failed with exit code ' + chalk.red(exitCode),
    );
    process.exit(exitCode);
  }
};

const killApp = async () => {
  console.log(INFO_ICON + ' Terminating any running app instances...');

  const subprocess = Bun.spawn(['killall', SCHEME_NAME], {
    stderr: 'pipe',
    stdout: 'pipe',
  });
  const exitCode = await subprocess.exited;

  if (exitCode === 0) {
    console.log(CHECK_ICON + ' Succesfully terminated any running instances ');
  } else {
    console.write(await readableStreamToText(subprocess.stderr));
    console.log(
      CROSS_ICON +
        ' Terminating running instances failed with exit code ' +
        chalk.red(exitCode),
    );
  }
};

const runApp = async () => {
  console.log(
    INFO_ICON +
      ' Launching application at ' +
      chalk.blueBright(
        `macos/WebViewHost/build/Build/Products/${BUILD_TYPE}/${SCHEME_NAME}.app`,
      ),
  );

  const subprocess = Bun.spawn(
    [
      'open',
      `macos/WebViewHost/build/Build/Products/${BUILD_TYPE}/${SCHEME_NAME}.app`,
    ],
    {
      stderr: 'pipe',
      stdout: 'pipe',
    },
  );
  const exitCode = await subprocess.exited;

  if (exitCode === 0) {
    console.log(
      CHECK_ICON +
        ' Successfully launched application at ' +
        chalk.blueBright(
          `macos/WebViewHost/build/Build/Products/${BUILD_TYPE}/${SCHEME_NAME}.app`,
        ),
    );
  } else {
    console.write(await readableStreamToText(subprocess.stderr));
    console.log(
      CROSS_ICON +
        ' Launching application failed with exit code ' +
        chalk.red(exitCode),
    );
    process.exit(exitCode);
  }
};

const runDev = async () => {
  console.log(INFO_ICON + ' Starting dev server for JS packages...');

  JS_DEV_PROC = Bun.spawn([
    'bunx',
    'concurrently',
    '"bun --filter \'ipc\' dev"',
    '"bun --filter \'api\' dev"',
    '"bun --filter \'data\' dev"',
    '"bun --filter \'ui\' dev"',
    '"bun --filter \'react-app\' dev"',
  ]);
};

const buildJSPackage = async (packageName: string, cmd: string) => {
  console.log(INFO_ICON + ' Building package ' + chalk.blueBright(packageName));

  const start = Date.now();
  const subprocess = Bun.spawn([...cmd.split(' ')], {
    stderr: 'pipe',
    stdout: 'pipe',
  });

  const exitCode = await subprocess.exited;

  const stop = Date.now();
  const secondsElapsed = (stop - start) / 1000;

  if (exitCode === 0) {
    console.log(
      CHECK_ICON +
        ' Build succeeded in ' +
        chalk.blueBright(`${secondsElapsed}s`),
    );
  } else {
    console.write(await readableStreamToText(subprocess.stdout));
    console.write(await readableStreamToText(subprocess.stderr));
    console.log(
      CROSS_ICON +
        ' Building package ' +
        chalk.blueBright(packageName) +
        ' failed with exit code ' +
        chalk.red(exitCode),
    );
    process.exit(exitCode);
  }
};

const buildJS = async () => {
  await buildJSPackage('ipc', 'bun --filter ipc release');
  await buildJSPackage('api', 'bun --filter api release');
  await buildJSPackage('data', 'bun --filter data release');
  await buildJSPackage('ui', 'bun --filter ui release');
  await buildJSPackage('react-app', 'bun --filter react-app build');
};

if (BUILD_TYPE === 'Debug') {
  await buildNative();
  await runDev();

  await killApp();
  await sleep(4000);
  await runApp();

  console.log(
    INFO_ICON + ' Press ' + chalk.bold.blueBright('^ + C') + ' to quit',
  );
} else {
  await buildJS();
  await buildNative();

  await killApp();
  await runApp();
}

process.on('SIGINT', async () => {
  console.log();
  await killApp();
  JS_DEV_PROC?.kill('SIGTERM');
});
