import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PRODUCT_PORT;


app.use(bodyParser.json({ extended: true }));

/******************************************************
 * Load app routes
 */


//Product Information
const productSvc = require('./controllers/product.controller');
app.use('/product', productSvc);




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});