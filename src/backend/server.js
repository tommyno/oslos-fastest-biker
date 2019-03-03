/**
 * Dependencies
 */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './routers/api';

const port = process.env.PORT || 3333;

/**
 * Create our express app
 */
const app = express();

/**
 * Enable CORS
 *
 * TODO: Enable this only for the applicable domains in production
 */
app.use(cors());

/**
 * Enable JSON body parsing
 */
app.use(bodyParser.json());

/**
 * Health check
 */
app.use('/api', apiRouter);

/**
 * Attach server to port
 */
app.listen(port, () => {
  console.log(`Backend listening to port ${port}`);
});