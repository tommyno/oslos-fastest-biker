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
 * Get appropriate start script
 */
const startScript = packageJson.scripts[`${APP}:start`];

/**
 * Run start script for the specified app
 */
if (startScript) {
  const start = spawn('npm', ['run', `${APP}:start`], {
    stdio: 'inherit'
  });

  start.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}