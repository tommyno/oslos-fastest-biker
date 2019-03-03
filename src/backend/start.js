/**
 * Load environment vars from .env
 */
require('dotenv').config();

/**
 * Enable ES2016+
 */
require('babel-polyfill');
require('babel-register');

/**
 * Initialize application
 */
require('./server');