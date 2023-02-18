import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

/******************************************************
 * Load app routes
 */

//Product Information
const productSvc = require('./controllers/product.controller');
app.use('/product', productSvc);
// Reviews
const reviewSvc = require('./controllers/review.controller');
app.use('/review', reviewSvc);

// Load data connectors
const dataModel = require('./data/sqliteConnector');
app.set("reviewDB", dataModel);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});