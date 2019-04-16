const { getHighscore } = require('../controllers/getHighscore');
const { getStations } = require('../controllers/getStations');
const { getDistance } = require('../controllers/getDistance');
const express = require('express');

// Create our express app
const apiRouter = express();

// Custom API endpoints
apiRouter.post('/highscore', getHighscore);
apiRouter.post('/distance', getDistance);
apiRouter.get('/stations', getStations);

module.exports = apiRouter;
