import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use(bodyParser.json({ extended: true }));

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
const dataModel2 = require('./data/tingodbConnector');
app.set("productsDB", dataModel2);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});