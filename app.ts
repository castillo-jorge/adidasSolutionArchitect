import express, { Express, Request, Response } from 'express';

const bodyParser = require('body-parser');



const app:Express = express();
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



module.exports = app; //for testing