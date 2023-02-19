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
const authMW = require('../middlewares/authorization.model');


router.route("/:id")
    .get(function (req: Request, res: Response, next: CallableFunction) {
        const id: string = req.params.id;

        //call model function to retrieve review data (async)
        reviewModel.getReview(req.app, id, (err: Error, result: object) => {
            if (err === null) {
                res.status(200).json(result);
            }
            else {

            }

        });

    })
    .put(function (req: Request, res: Response, next: CallableFunction) {
        res.json({ "operation": "put" });
    })
    .post(function (req: Request, res: Response, next: CallableFunction) {
        authMW.checkAuth(req, res, (authError: Error) => {
            if (authError) {
                res.status(parseInt(authError.name)).json({ "error": authError.message });
            }
            else {
                const id: string = req.params.id;

                reviewModel.createReview(req.app, id, req.body, (err: Error, result: object) => {
                    if (err === null) {
                        res.status(204).json();
                    }
                    else {
                        res.status(parseInt(err.name)).json({ "error": err.message });
                    }
                });
            }
        });
    })
    .delete(function (req: Request, res: Response, next: CallableFunction) {
        authMW.checkAuth(req, res, (authError: Error) => {
            if (authError) {
                res.status(parseInt(authError.name)).json({ "error": authError.message });
            }
            else {
                const id: string = req.params.id;
                reviewModel.deleteReview(req.app, id, (err: Error) => {
                    if (err === null) {
                        res.status(204).json();
                    } else {
                        res.status(parseInt(err.name)).json({ "error": err.message });
                    }
                });
            }
        });
    })
    .all(function (req: Request, res: Response, next: CallableFunction) {
        // Empty response for all other verbs
        res.status(501).send();
    })


module.exports = router;