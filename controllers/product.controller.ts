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

        productModel.getProduct(req, id, (err: Error, result: any) => {
            if (err === null) {
                //now we have the data coming from adidas API
                //let's aggregate reviews data
                productModel.getProductReview(req, id, (err: Error, reviewResult: any) => {
                    if (err === null) {
                        //aggregate results
                        result["review"] = reviewResult;
                        //send complete response
                        res.status(200).json(result);
                    }
                    else{
                        res.status(parseInt(err.name)).json({ "error": err.message });
                    }
                })
            }
            else {
                res.status(parseInt(err.name)).json({ "error": err.message });
            }

        })



    })
    .all(function (req: Request, res: Response, next: CallableFunction) {
        // Empty response for all other verbs
        
        res.status(501).send();
    })


module.exports = router;