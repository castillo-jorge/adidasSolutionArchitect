/*****************************************************************************************/
/* Products Microservice                                                                 */
/* Version 1.0                                                                           */
/*                                                                                       */
/*                                                                                       */
/*****************************************************************************************/

const express = require('express');
const router = express.Router();
import { Request, Response } from "express";
const productModel = require('../models/product.model');


router.route("/:id")
    .get(function (req: Request, res: Response, next: CallableFunction) {
        const id: string = req.params.id;

        //call model function to product review data (async)
        productModel.getProduct(req.app, id, (err: Error, result: any) => {
            debugger;
            if (err === null) {
                res.status(200).json(result);
            }
            else {
                res.status(parseInt(err.name)).json({ "error": err.message });
            }

        });

    })
    .all(function (req: Request, res: Response, next: CallableFunction) {
        // Empty response for all other verbs
        res.status(501).send();
    })


module.exports = router;