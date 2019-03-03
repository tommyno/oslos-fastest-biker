/**
 * Dependencies
 */
const spawn = require('cross-spawn');

/**
 * Package.json
 */
const packageJson = require('../package.json');

/**
 * Get the specified app from the environment
 */
const APP = process.env.APP;

/**
 * Abort of no app specified
 */
if (!APP) {
  console.log('No APP specified - skipping build step')
  process.exit();
}

/**
 * Get appropriate build script
 */
const buildScript = packageJson.scripts[`${APP}:build`];

/**
 * Abort if invalid app specified
 */
if (!buildScript) {
  throw new Error('Non-existing APP specified - either you forgot to set the environment variable or you made a typo!')
}

/**
 * Run build script for the specified app
 */
const build = spawn('npm', ['run', `${APP}:build`], {
  stdio: 'inherit'
});

build.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});