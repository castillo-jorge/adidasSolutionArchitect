import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.REVIEW_PORT;


app.use(bodyParser.json({ extended: true }));

/******************************************************
 * Load app routes
 */


// Reviews
const reviewSvc = require('./controllers/review.controller');
app.use('/review', reviewSvc);

// Load data connectors
const dataModel = require('../data/sqliteConnector');
app.set("reviewDB", dataModel);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});