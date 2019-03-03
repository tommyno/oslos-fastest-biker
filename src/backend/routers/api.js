const {getHighscore, getDistance, getStations} = require('../controllers/api');

/**
 * Dependencies
 */
const express = require('express');

/**
 * Create our express app
 */
const apiRouter = express();

// Custom api
apiRouter.post('/highscore', getHighscore);

apiRouter.get('/distance', getDistance);

apiRouter.get('/stations', getStations);

module.exports = apiRouter;