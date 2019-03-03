/**
 * Dependencies
 */
const express = require('express');
const history = require('connect-history-api-fallback');

/**
 * Environment / configuration
 */
const port = process.env.PORT || 3000;

/**
 * Create our express app
 */
const app = express();

/**
 * Serve static files from the appropriate folder
 */
/**
 * Use history fallback
 */
app.use(history());
app.use(express.static(`${__dirname}/../build`));

/**
 * Attach server to port
 */
app.listen(port, () => {
  console.log(`frontend-app listening to port ${port}`);
});