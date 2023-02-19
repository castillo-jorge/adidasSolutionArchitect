/*****************************************************************************************/
/* Products Review Microservice                                                                 */
/* Version 1.0                                                                           */
/*                                                                                       */
/*                                                                                       */
/*****************************************************************************************/

const express = require('express');
const router = express.Router();
import { Request, Response } from "express";
const reviewModel = require('../models/review.model');


router.route("/:id")
    .get(function (req: Request, res: Response, next: CallableFunction) {
        const id = req.params.id;

        //call model function to retrieve review data (async)
        reviewModel.getReview(req.app, id, (err: Error, result: object) => {
            //Handle the response from DB
            if (err === null) {
                if (result){
                    //we got a result
                    res.json(result);
                }
                else{
                    //not found
                    res.status(404).json();
                }

            }
            else {
                //any other problem
                //TODO: check err object and send a better error code
                res.status(500).send(err);
            }
        });

    })
    .put(function (req: Request, res: Response, next: CallableFunction) {
        res.json({ "operation": "put" });
    })
    .post(function (req: Request, res: Response, next: CallableFunction) {
        res.json({ "operation": "post" });
    })
    .delete(function (req: Request, res: Response, next: CallableFunction) {
        const id = req.params.id;

        reviewModel.deleteReview(req.app, id, (err: Error) => {
            if (err === null){
                res.status(204).json();
            }else{
                res.status(500).json();
            }
        })
    })
    .all(function (req: Request, res: Response, next: CallableFunction) {
        // Empty response for all other verbs
        res.status(501).send();
    })


module.exports = router;